import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import * as actions from '../actions/login.js'
import { connect } from 'react-redux'
import CryptoJS from 'crypto-js'



class Signup extends React.Component {

	state = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password_confirmation: "",
		bio: "",
		photo_url:""
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handlePasswordChange = (e) => {
	    let encodedSource = CryptoJS.AES.encrypt(e.target.value, "secret-key").toString();
		this.setState({
			[e.target.name]: encodedSource
		})
	}
	

	handleSubmit = (e) => {
		e.preventDefault()
		let bytes  = CryptoJS.AES.decrypt(this.state.password, 'secret-key');
		let password = bytes.toString(CryptoJS.enc.Utf8);
		let bytes2  = CryptoJS.AES.decrypt(this.state.password_confirmation, 'secret-key');
		let password_confirmation = bytes2.toString(CryptoJS.enc.Utf8);
		if (password !== password_confirmation){
			alert("passwords do not match")
		} else {
			this.props.signup(this.state, this.props, password)
			this.setState({
				first_name: "",
				last_name: "",
				email: "",
				password: "",
				password_confirmation: "",
				bio: "",
				photo_url:""
			})
		}
	}

	render(){
		return(
			<div>
				<br/>
				
				<Form id="sign-up-form" onSubmit={this.handleSubmit}>
				<h1>Signup</h1>
				  <Form.Row>
				    <Form.Group as={Col} controlId="formGridFirstName">
				      <Form.Label>First Name</Form.Label>
				      <Form.Control name="first_name" type="text" placeholder="Enter First Name" onChange={this.handleChange}/>
				    </Form.Group>

				    <Form.Group as={Col} controlId="formGridLastName">
				      <Form.Label>Last Name</Form.Label>
				      <Form.Control name="last_name" type="text" placeholder="Enter Last Name" onChange={this.handleChange}/>
				    </Form.Group>
				  </Form.Row>

				  <Form.Group controlId="formGridAEmail">
				    <Form.Label>Email</Form.Label>
				    <Form.Control name="email" type="email" placeholder="Email" onChange={this.handleChange}/>
				  </Form.Group>

				  <Form.Group controlId="formGridAPassword">
				    <Form.Label>Password</Form.Label>
				    <Form.Control name="password" type="password" placeholder="Password" onChange={this.handlePasswordChange}/>
				  </Form.Group>

				  <Form.Group controlId="formGridPassword2">
				    <Form.Label>Confirm Password</Form.Label>
				    <Form.Control name="password_confirmation" type="password" placeholder="Confirm Password" onChange={this.handlePasswordChange}/>
				  </Form.Group>

				  <Form.Group controlId="exampleForm.ControlTextarea1">
				    <Form.Label>Bio</Form.Label>
				    <Form.Control name="bio" as="textarea" rows="3" onChange={this.handleChange}/>
				  </Form.Group>

				  	<div className="foo">
				  		<div className="upload-file">
				      		Upload Profile Picture: &ensp; <input className="upload-file-button" type="file"  />
				      	</div>
				    </div>

				    <br />
				    <br />
				    <br />

				  <Button variant="primary" type="submit">
				  	Submit
				  </Button>
				</Form>
			</div>
		)
	}
}

export default connect(null, actions)(Signup)