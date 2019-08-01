import React from 'react'
import { connect } from 'react-redux'

class Home extends React.Component {

	renderItems = () => {
		let token = localStorage.getItem("token")
		return token ?
		 <p style={{marginTop: 40, fontSize: '3em'}}>Hello, {this.props.first_name}! </p> 
		 : 
		 <p style={{fontSize: '3em'}}className="home-login-error">Please Login To View</p>
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