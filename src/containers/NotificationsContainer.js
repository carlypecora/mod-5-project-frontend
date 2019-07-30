import React, { Fragment } from 'react'
import * as actions from '../actions/selectedConversation'
import BellIcon from 'react-bell-icon';
import { connect } from 'react-redux'
import { ActionCableConsumer } from 'react-actioncable-provider';

class NotificationsContainer extends React.Component {

	state = {
		open: false,
	}

	
	componentDidUpdate(){
		if (this.state.open){
			this.props.viewNotifications()
		} else {
			this.props.hideNotifications()
		}
	}

	unreads = () => {
		let unreads = this.props.currentUser.notifications.filter(note => !note.read)
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
		          onReceived={(data) => this.props.handleNewNotifications(this.props.currentUser, data)}
		        />

				<div style={{display:'inline'}}onClick={()=>this.setState({open: !this.state.open})}>
				 {this.unreads() ? <BellIcon width='20' active={true} animate={true} /> : <BellIcon width='20'/> }
				</div>
			</Fragment>
		)
	}
}

function mapStateToProps(state){
	return ({...state.auth})
}

export default connect(mapStateToProps, actions)(NotificationsContainer)