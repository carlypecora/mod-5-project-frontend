import React from 'react'
import Message from './Message'
import * as actions from '../actions/selectedConversation.js'
import { connect } from 'react-redux'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { ActionCable } from 'react-actioncable-provider';
// import Cable from './Cable';

class CurrentConversation extends React.Component {

	state ={
		log: [],
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
			<InputGroup className="mb-3" style={{paddingTop: 10}}>
			    <FormControl
			     onChange={this.handleChange} placeholder="Write a message..."
			    />
			    <InputGroup.Append>
			      <Button variant="outline-secondary">Send</Button>
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