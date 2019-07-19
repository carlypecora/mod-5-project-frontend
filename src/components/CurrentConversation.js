import React from 'react'
import Message from './Message'
import * as actions from '../actions/selectedConversation.js'
import { connect } from 'react-redux'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { ActionCableConsumer } from 'react-actioncable-provider';
import Cable from './Cable';

class CurrentConversation extends React.Component {

	state ={
		message: ""
	}

	componentDidMount() {
		this.props.selectedConversation(this.props.match.params.id)
	}

	// handleMessageSubmit = (message) => {
 //        this.state.socket.send(JSON.stringify({command: 'subscribe', channel: 'MessagesChannel', conversation_id: parseInt(this.props.id)}))
 //        this.setState({
 //        	log: [...this.state.log, message]
 //        })
 //    }

 	handleSubmit = (e) => {
	    e.preventDefault()
		fetch('http://localhost:3000/messages', {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        'Accepts': 'application/json'
	      },
	      body: JSON.stringify({
	        	text: this.state.message,
	        	conversation_id: this.props.id,
	        	user_id: this.props.currentUser.id
	      	})
	    })
		 .then(res => res.json())
		 .then(data => this.setState({
		 	message: ''
		 }))
		 .catch(error => console.error(error))
  	}


    handleChange = (e) => {
    	this.setState({
    		message: e.target.value
    	})
    }

	renderMessages = () => {
		return this.props.messages && this.props.messages.map(message => <Message key={message.id} {...message}/>)
	}

	renderEntireConversation = () => {
		return this.props.messages && this.props.token ?
		(
			<div className="selected-convo">
			{this.renderMessages()}
			<ActionCableConsumer
	          channel={{ channel: 'ConversationsChannel' }}
	          onReceived={(data) => console.log(data)}
	          channel={{channel: 'MessagesChannel', conversation_id: this.props.id}}
	        />
		
			<InputGroup className="mb-3" style={{paddingTop: 10}}>
			    <FormControl
			     onChange={this.handleChange} placeholder="Write a message..."
			     
			    />
			    <InputGroup.Append>
			      <Button onClick={this.handleSubmit} variant="outline-secondary">Send</Button>
			    </InputGroup.Append>
			  </InputGroup>
		</div>)
		:
		null
			
	}


	render(){
		return(
			<div>
				{this.renderEntireConversation()}
			</div>
		)
	}
}

function mapStateToProps(state){
	return ({...state.auth, ...state.selected.currentConversation})
}

export default connect(mapStateToProps, actions)(CurrentConversation)