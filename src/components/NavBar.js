import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/logout.js'
import { Link } from 'react-router-dom'



const NavBar = (props) => {
	return (
	<div className="nav-bar">
		<div className="nav-links">
    		{renderNavItems(props)}
    	</div>
    </div> 
   )
}

const handleLogout = (props) => {
	localStorage.removeItem("token")
	props.logout()
}

const renderNavItems = (props) => {
	// let token = localStorage.getItem("token")
	if (!props.token) {
		return(
			<div>
		    	<Link to='/login' className="single-nav-link">Login</Link>
		    	<Link to='/signup' className="single-nav-link">Signup</Link>
    		</div>
		)
	} else {
		return (
			<div>
		 	{props.title && window.location.pathname !== "/home"? 
				<div className="nav-channel">
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Channel Name:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.title}</div>&nbsp;&nbsp;&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Purpose:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.purpose}</div>
				</div>
				:
				null
			}
				<Link onClick={() => handleLogout(props)} className="single-nav-link" to='/login'>Logout</Link>
			</div>
			)
	}
}

function mapStateToProps(state){
	return({...state.auth, ...state.selected.currentConversation})
}

export default connect(mapStateToProps, actions)(NavBar)