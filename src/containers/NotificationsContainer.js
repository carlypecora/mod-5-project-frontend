import React, { Fragment } from 'react'
import * as actions from '../actions/selectedConversation'
import BellIcon from 'react-bell-icon';
import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider';

class NotificationsContainer extends React.Component {

	state = {
		open: false,
		sender_id: false,
	}

	
	componentDidUpdate(){
		if (this.state.open){
			this.props.viewNotifications()
		} else {
			this.props.hideNotifications()
		}
	}

	unreads = () => {
		let unreads
		if (this.props.currentUser.notifications){
		unreads = this.props.currentUser.notifications.filter(note => {
		
			return !note.read
			})
		if (unreads.length > 0) {
			return true
		} else {
			return false
		}
	  }
	}

	render(){
		
		console.log(this.unreads())
		return(
			<Fragment>
			<ActionCableConsumer
		          channel={{ channel: 'NotificationsChannel' }}
		          onReceived={(data) => {
		          	if(data.sender_id === this.props.currentUser.id){
		          		this.setState({sender_id: true})
		          	 } else if (this.props.currentUser.id === data.notification.user.id){
		          	 	this.setState({sender_id: false})
		          	 	this.props.handleNewNotifications(this.props.currentUser, data.notification)
		          	 	
		          		} else {
		          			this.setState({sender_id: false})
		          		}
		          	  }
		            }
		        />

				<div style={{display:'inline'}}onClick={()=>this.setState({open: !this.state.open})}>
				 {this.unreads() ? <div className="bell"><BellIcon color='grey' width='20' active={true} animate={true} /></div> : <div className="bell"><BellIcon color='grey' width='20'/></div> }
				</div>
			</Fragment>
		)
	}
}

function mapStateToProps(state){
	return ({...state.auth})
}

export default connect(mapStateToProps, actions)(NotificationsContainer)