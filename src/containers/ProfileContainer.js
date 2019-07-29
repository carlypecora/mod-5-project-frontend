import React from 'react'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import * as actions from '../actions/selectedConversation'
import { connect } from 'react-redux'


const ProfileContainer = (props) => {

return !props.token ?
	 null
	:
  (
    <div className="right-sidebar">
     {renderItems(props)}
    </div>
  )
}

const renderItems = (props) => {
	if (!!props.notifications) {
		return <div> notifications </div>
	} else {
		return (
		<div>
		{props.selectedUser.id !== props.currentUser.id ? <h5 style={{float: 'right', marginRight: 5, display: 'inline-block', cursor: 'pointer'}} onClick={() => handleClick(props.currentUser, props.resetSelectedUser)}>x</h5> : null}
	      <div id="profile-card">
			<Card style={{ width: '18rem' }}>
			  <Card.Img variant="top" src={props.selectedUser.photo_url} />
			  <Card.Body>
			    <Card.Title>{props.selectedUser.first_name} {props.selectedUser.last_name}</Card.Title>
			  </Card.Body>
			  <ListGroup className="list-group-flush">
			    <ListGroupItem>Email: {props.selectedUser.email}</ListGroupItem>
			    <ListGroupItem>Bio: {props.selectedUser.bio}</ListGroupItem>
			  </ListGroup>
			</Card>
		  </div>
		  </div>
		)
	}
}

const handleClick = (currentUser, reducer) => {
	reducer(currentUser)
}

function mapStateToProps(state){
	return ({...state.auth, ...state.selected})
}


export default connect(mapStateToProps, actions)(ProfileContainer)