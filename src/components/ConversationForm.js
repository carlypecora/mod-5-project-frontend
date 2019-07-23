import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class ConversationForm extends React.Component {
	render(){
		return (
			<Form>
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
		)
	}
}

export default ConversationForm