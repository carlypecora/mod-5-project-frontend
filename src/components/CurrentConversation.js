import React from 'react'
import Message from './Message'
import * as actions from '../actions/selectedConversation.js'
import { connect } from 'react-redux'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { ActionCableConsumer } from 'react-actioncable-provider';

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
	        	conversation_id: this.props.currentConversation.id,
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
		return this.props.currentConversation.messages && this.props.currentConversation.messages.map(message => <Message key={message.id} {...message}/>)
	}

	handleJoinClick = () => {
		
		this.props.joinConversation(this.props.currentUser, this.props.currentConversation, this.props)
			
	}

	renderMessageForm = () => {
		let userConvoIds = this.props.currentUser.conversations.map(convo => convo.id)
		return userConvoIds.includes(this.props.currentConversation.id) ?
				(<Form onSubmit={this.handleSubmit}>
				  <InputGroup className="mb-3" style={{paddingTop: 10}}>
				    <FormControl
				     onChange={this.handleChange} value={this.state.message} placeholder="Write a message..."
				     
				    />
				    <InputGroup.Append>
				      <Button type="submit" variant="outline-secondary">Send</Button>
				    </InputGroup.Append>
				  </InputGroup>
				</Form>)
				: 
			 <Button onClick={this.handleJoinClick} variant="outline-secondary">Join Channel?</Button>
		}

	renderEntireConversation = () => {
		return this.props.currentConversation.messages && this.props.token ?
		(
			<div className="selected-convo">
			{this.renderMessages()}
			<ActionCableConsumer
	          onReceived={(data) => {
	          	this.props.resetCurrentConversation(this.props.currentConversation, data)
	          	this.setState({message: ''})
	          	}
	          }
	          channel={{channel: 'MessagesChannel', conversation_id: this.props.currentConversation.id}}
	        />
	        {this.renderMessageForm()}
			
			
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
	return ({...state.auth, ...state.selected})
}



export default connect(mapStateToProps, actions)(CurrentConversation)