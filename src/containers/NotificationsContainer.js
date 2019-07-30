import React, { Fragment } from 'react'
import * as actions from '../actions/selectedConversation'
import BellIcon from 'react-bell-icon';
import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider';

class NotificationsContainer extends React.Component {

	state = {
		open: false,
		sender_id: false
	}

	
	componentDidUpdate(){
		if (this.state.open){
			this.props.viewNotifications()
		} else {
			this.props.hideNotifications()
		}
	}

	unreads = () => {
		let unreads = this.props.currentUser.notifications.filter(note => {
		
			return !note.read && note.user_id !== this.props.currentUser.id
		})
		if (unreads.length > 0) {
			return true
		} else {
			return false
		}
	}

	render(){
		return(
			<Fragment>
			<ActionCableConsumer
		          channel={{ channel: 'NotificationsChannel' }}
		          onReceived={(data) => {
		          	console.log(data)
		          	if(data.sender_id === this.props.currentUser.id){
		          		this.setState({sender_id: true})
		          	} else {
		          		this.setState({sender_id: false})
		          	}
		          	this.props.handleNewNotifications(this.props.currentUser, data.notification)
		          	}
		          }
		        />

				<div style={{display:'inline'}}onClick={()=>this.setState({open: !this.state.open})}>
				 {this.unreads() && !this.state.sender_id ? <BellIcon color='navy' width='20' active={true} animate={true} /> : <BellIcon color='navy' width='20'/> }
				</div>
			</Fragment>
		)
	}
}

function mapStateToProps(state){
	return ({...state.auth})
}

export default connect(mapStateToProps, actions)(NotificationsContainer)