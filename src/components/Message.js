import React from 'react'
import * as actions from '../actions/selectedConversation'
import { connect } from 'react-redux'

class Message extends React.Component {

	handleClick = (user_id, reducer) => {
		reducer(user_id)
	}

		render(){
		return(
			<div className="message">
				<div className="asdf">
					<div>
						<strong style={{cursor: 'pointer'}} onClick={() => this.handleClick(this.props.user_id, this.props.selectUser)}>{this.props.user_name}</strong>
					</div>
					<div>
						&nbsp;&nbsp;&nbsp;&nbsp;
						{this.props.text}
					</div>
					
				</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {...state.auth}
}

export default connect(mapStateToProps, actions)(Message)