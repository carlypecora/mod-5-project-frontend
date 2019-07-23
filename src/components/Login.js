import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import * as actions from '../actions/login.js'
import { connect } from 'react-redux'

// let token = localStorage.getItem("token")


class Login extends React.Component {


	state = {
		email: '',
		password: ''
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		this.props.login(this.state, this.props)
		this.setState({
			email: '',
			password: ''
		})
	}

	render(){
		return(
				<div>
					<div id="login-form">
					<br/>
					<h1>Login</h1>
						<Form onSubmit={this.handleSubmit}>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control onChange={this.handleChange} name="email" type="email" placeholder="Enter email" />
						  </Form.Group>

						  <Form.Group controlId="formBasicPassword">
						    <Form.Label>Password</Form.Label>
						    <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Password" />
						  </Form.Group>
						  <Form.Group controlId="formBasicChecbox">
						  </Form.Group>
						  <Button variant="primary" type="submit">
						    Submit
						  </Button>
						</Form>
					</div>
				</div>
		)
	}
		
}

export default connect(null, actions)(Login)



