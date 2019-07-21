import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import * as actions from '../actions/login.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

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
						<Form>
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
						    <Link to='/home' style={{color: 'white'}} onClick={this.handleSubmit}>Submit</Link>
						  </Button>
						</Form>
					</div>
				</div>
			)
		}
		
}

const mapStateToProps = (state) => {
  return {
   ...state.auth
  }
}

export default connect(mapStateToProps, actions)(Login)



