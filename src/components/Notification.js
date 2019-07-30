import React from 'react'
import * as actions from '../actions/autoLogin'
import { connect } from 'react-redux'

class Notification extends React.Component {

		componentWillUnmount(){
			if(!this.props.note.read){
			fetch(`http://localhost:3000/notifications/${this.props.note.id}`, {
				method: 'PATCH',
				headers: {
			        'Content-Type': 'application/json',
			        Accept: 'application/json'
		      },
		      	body: JSON.stringify({
		      		read: true
		      	})
			})
			.then(res => res.json())
			.then(data => {
				this.props.resetUserForNotifications(this.props.currentUser, data)
			})
		  }
		}

	render() {
		return (
			<div>
				<div className="single-notification">
					<div> 
						<h6>{this.props.note.content}</h6><div>{this.props.note.created_at.slice(0, 10)}</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return ({...state.auth})
}

export default connect(mapStateToProps, actions)(Notification)