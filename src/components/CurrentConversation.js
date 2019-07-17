import React from 'react'
import Message from './Message'
import { connect } from 'react-redux'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class CurrentConversation extends React.Component {

	renderMessages = () => {
		return this.props.messages && this.props.messages.map(message => <Message key={message.id} {...message}/>)
	}

	renderEntireConversation = () => {
		return this.props.messages ?
		(<div className="selected-convo">
			{this.renderMessages()}
			<InputGroup className="mb-3" style={{paddingTop: 10}}>
			    <FormControl
			      placeholder="Recipient's username"
			      aria-label="Recipient's username"
			      aria-describedby="basic-addon2"
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
	return ({...state.selected.currentConversation})
}



export default connect(mapStateToProps)(CurrentConversation)