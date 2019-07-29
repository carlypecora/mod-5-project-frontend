import React, { Fragment } from 'react'
import * as actions from '../actions/selectedConversation'
import { FaBell } from "react-icons/fa";
import { connect } from 'react-redux'

class Notifications extends React.Component {

		state = {
			open: false
		}

	componentDidUpdate(){
		if (this.state.open){
			this.props.viewNotifications()
		} else {
			this.props.hideNotifications()
		}
	}

	render(){
		return(
			<Fragment>
				<div style={{display:'inline'}}onClick={()=>this.setState({open: !this.state.open})}><FaBell /></div>
			</Fragment>
		)
	}
}

export default connect(null, actions)(Notifications)