import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'


class Signup extends React.Component {
	render(){
		return(
			<div>
				<br/>
				
				<Form id="sign-up-form">
				<h1>Signup</h1>
				  <Form.Row>
				    <Form.Group as={Col} controlId="formGridFirstName">
				      <Form.Label>First Name</Form.Label>
				      <Form.Control type="text" placeholder="Enter First Name" />
				    </Form.Group>

				    <Form.Group as={Col} controlId="formGridLastName">
				      <Form.Label>Last Name</Form.Label>
				      <Form.Control type="text" placeholder="Enter Last Name" />
				    </Form.Group>
				  </Form.Row>

				  <Form.Group controlId="formGridAPassword">
				    <Form.Label>Password</Form.Label>
				    <Form.Control placeholder="Password" />
				  </Form.Group>

				  <Form.Group controlId="formGridPassword2">
				    <Form.Label>Confirm Password</Form.Label>
				    <Form.Control placeholder="Confirm Password" />
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
				    <Link style={{color: 'white'}} to='/home'>Submit</Link>
				  </Button>
				</Form>
			</div>
		)
	}
}

export default Signup