import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {

	renderItems = () => {
		let token = localStorage.getItem("token")
		return token ?
		 <h2 style={{marginTop: 40}}>Hello, {this.props.first_name}! </h2> 
		 : 
		 <h3 className="home-login-error">Please Login To View</h3>
	}

	render(){
		return(
			<div>
				{this.renderItems()}
			</div>
		)
	}
}

function mapStateToProps(state){
	return ({...state.auth.currentUser})
}



export default connect(mapStateToProps)(Home)