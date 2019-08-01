import React from 'react'
// import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Notification from '../components/Notification'
import * as actions from '../actions/selectedConversation'
import { connect } from 'react-redux'
import { Card } from 'antd';
const { Meta } = Card;


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

const mapThroughNotifications = (props) => {
	if (props.currentUser.notifications.length > 0){
		return props.currentUser.notifications.map(note => { 
			return <Notification key={Math.random()} note={note} />
		})
	} else {
		return <div>No notifications at this time.</div>
	}
}

const fullName = (props) => {
	return `${props.selectedUser.first_name} ${props.selectedUser.last_name}`
}

const renderItems = (props) => {
	if (!!props.notifications){
		return (
			<div className="all-notifications">
				{props.currentUser.notifications.length > 0 ? mapThroughNotifications(props).reverse() : <div>No notifications at this time</div>}
			</div>
			)
	} else {
		return (
		<div className="outer-profile-card" style={{marginTop: 20}}>
	      <div>
		  	{props.selectedUser.id !== props.currentUser.id ? <h5 style={{cursor: 'pointer', textAlign: 'left', marginLeft: 5}} onClick={() => handleClick(props.currentUser, props.resetSelectedUser)}>x</h5> : <h5>&nbsp; </h5>}

	      <Card
		    style={{ width: 256, border: 'none' }}
		    cover={<img alt="" src={props.selectedUser.photo_url} />}
		  >

		    <Meta title={fullName(props)} description={props.selectedUser.email} />
		    <br />
		    <Meta description={props.selectedUser.bio} />
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