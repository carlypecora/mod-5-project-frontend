import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import * as actions from '../actions/selectedConversation.js'
import { connect } from 'react-redux'

class ConversationForm extends React.Component {

	state = {
		title: "",
		purpose: ""
	}

	fullName = () => {
		return `${this.props.currentUser.first_name} ${this.props.currentUser.last_name}`
	}


	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.createConversation(this.state, this.props, this.fullName(), this.props.currentUser)
		this.setState({
			title: "",
			purpose: ""
		})
	}

	render(){
		return (
			<Form id="convo-form" style={{marginTop: 40}} onChange={this.handleChange} onSubmit={this.handleSubmit}>
				<h3>CREATE A NEW CHANNEL</h3>

				  <Form.Group controlId="formGridAEmail">
				    <Form.Label>Channel Title</Form.Label>
				    <Form.Control name="title" type="text" placeholder="Title" />
				  </Form.Group>

				  <Form.Group controlId="formGridAPassword">
				    <Form.Label>Purpose</Form.Label>
				    <Form.Control name="purpose" type="text" placeholder="Purpose" />
				  </Form.Group>

				    <br />
				    <br />
				    <br />

				  <Button variant="primary" type="submit">
				  	Submit
				  </Button>
				</Form>
		)
	}
}


function mapStateToProps(state){
	return({...state.auth})
}

export default connect(mapStateToProps, actions)(ConversationForm)