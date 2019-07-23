import React from 'react'

const Message = (props) => {

		return(
			<div className="message">
				<div className="asdf">
					<div>
						<strong>{props.user_name}</strong>
					</div>
					<div>
						&nbsp;&nbsp;&nbsp;&nbsp;
						{props.text}
					</div>
					
				</div>
			</div>
		)
}

export default Message