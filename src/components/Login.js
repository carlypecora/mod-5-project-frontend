import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import * as actions from '../actions/login.js'
import { connect } from 'react-redux'


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
		console.log('handle submit', this.props)
		this.props.login(this.state)
	}

	render(){
		console.log('login props', this.props)
		console.log('login state', this.state)
		let token = localStorage.getItem("token")
		console.log('login token', token)
	    if (!!token) {
	      return null
	    } else if (!token) {
	    	console.log(this.props)
		return(
			<div>
				<div id="login-form">
				<br/>
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
}

const mapStateToProps = (state) => {
  return {
   ...state.auth
  }
}

export default connect(mapStateToProps, actions)(Login)



