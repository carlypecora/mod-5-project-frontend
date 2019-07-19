import React from 'react'

class Message extends React.Component {
	state = {
		messageUser: {}
	}

	componentDidMount(){
		fetch(`http://localhost:3000/users/${this.props.user_id}`)
		.then(res => res.json())
		.then(user => {
			this.setState({
				messageUser: user
			})
		})
	}

	render(){
		return(
			<div className="message">
				<div className="asdf">
					<div>
						<strong>{this.state.messageUser.first_name} {this.state.messageUser.last_name}</strong>
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

export default Message