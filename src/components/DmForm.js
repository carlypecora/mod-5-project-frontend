import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import * as actions from '../actions/selectedConversation.js'
import { connect } from 'react-redux'


class DmForm extends React.Component {

	state = {
		users: [],
		searchUser: "",
		dmUsers: []
	}

	filterUsers = (users) => {
		return users.filter(user => user.first_name.toLowerCase().includes(this.state.searchUser.toLowerCase()))
	}

	handleChange = (e) => {
		this.setState({
			searchUser: e.target.value
		})
	}

	handleX = (e) => {
		let clickedUser = e.target.parentNode.innerText.split(" ")
		let yuser = this.state.dmUsers.filter(user => user.first_name === clickedUser[0] && user.last_name === clickedUser[1])
		let newDmUsers = this.state.dmUsers.filter(user => user.id !== yuser[0].id) 
			this.setState({
				dmUsers: newDmUsers
			})
	}

	renderChosenUsers = () => {
		if (this.state.dmUsers.length > 0){
			return (
				<div className="all-chosen">
				Chosen:
					{this.state.dmUsers.map(user => {
						return <div className="chosen" key={user.id}><div style={{display: 'inline'}}>{user.first_name} {user.last_name}</div><div style={{display: 'inline', color: 'gray', cursor: 'pointer'}} onClick={this.handleX}> &nbsp;x</div><br /></div>
					})}
				</div>
			)
		}
	}

	chooseUserDm = (e) => {
		let clickedUser = e.target.innerText.split(" ")
		let xusers = this.state.users.filter(user => user.id !== this.props.currentUser.id)
		let yuser = xusers.filter(user => user.first_name === clickedUser[0] && user.last_name === clickedUser[1])
		if (!this.state.dmUsers.includes(yuser[0]) && this.state.dmUsers.length < 3) {
		this.setState({
				dmUsers: [...this.state.dmUsers, yuser[0]]
			})
		} else if (this.state.dmUsers.includes(yuser[0])) {
			let newDmUsers = this.state.dmUsers.filter(user => user.id !== yuser[0].id) 
			this.setState({
				dmUsers: newDmUsers
			})
		} else {
			alert("limit 3 people per direct message")
		}

	}

	renderAllUsers = (users) => {
		let xusers = users.filter(user => user.id !== this.props.currentUser.id)
		let yusers = this.filterUsers(xusers)
		return yusers.map(user => <div style={{fontSize: 20}} onClick={this.chooseUserDm} className="dm-user" key={user.id}>{user.first_name} {user.last_name}</div>)
	}

	componentDidMount(){
		fetch("http://localhost:3000/users")
		.then(res => res.json())
		.then(data => {
			this.setState({
				users: data
			})
		})
	}

	handleSubmit = () => {
		this.props.createDm(this.state.dmUsers, this.props.currentUser, this.props)
		this.setState({
			users: [],
			searchUser: "",
			dmUsers: []
		})
	}


render(){
	return (
		<Form id="convo-form" style={{marginTop: 40}}>
		  <h2>Who would you like to Message?</h2>
		  <h4>3 people max</h4>
		  <Form.Group controlId="formGridAEmail">
		    <Form.Label>Enter Name</Form.Label>
		    <Form.Control name="title" type="text" placeholder="Search Names..." onChange={this.handleChange}/>
		  </Form.Group>
		  	{this.renderChosenUsers()}
		  	<div className="dm-user-border" style={{marginTop: 40}}>
		  		<h4 className="dm-choose-user-border">
		  			Choose a name
		  		</h4>
		  		{this.renderAllUsers(this.state.users)}
		  	</div>
		    <br />
		    <br />
		    <br />


		  <Button onClick={this.handleSubmit} variant="primary">
		  	Begin Direct Message
		  </Button>
		</Form>
	)
  }
}

function mapStateToProps(state){
	return({...state.auth})
}

export default connect(mapStateToProps, actions)(DmForm)