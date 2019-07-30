import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions/logout.js'
import NotificationsContainer from '../containers/NotificationsContainer'
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
			<div style={{flexDirection: 'row'}}>
		 	{props.title && window.location.pathname !== "/home"? 
				<div className="nav-channel">
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Channel Name:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.title}</div>&nbsp;&nbsp;&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Purpose:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.purpose}</div>&nbsp;&nbsp;&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Made By:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.creator}</div>&nbsp;&nbsp;&nbsp;
					<h6 style={{display: 'inline', fontWeight: 'bold'}}>Created On:</h6>&nbsp;&nbsp;&nbsp;
					<div style={{display: 'inline'}}>{props.created_at.slice(0, 10)}</div>&nbsp;&nbsp;&nbsp;
				</div>
				:
				null
			}
				<div style={{flexDirection: 'row', marginTop: 5, display: 'inline', float: 'right'}}>
					<div style={{color: '#0986a5', display: 'inline', textAlign: 'right', fontSize: 20, marginRight: 10}}><NotificationsContainer /></div>
					<Link onClick={() => handleLogout(props)} to='/login' style={{display: 'inline', marginRight: 10}}>Logout</Link>
				</div>
			</div>
			)
	}
}

function mapStateToProps(state){
	return({...state.auth, ...state.selected.currentConversation})
}
//unreads={props.unreads} resetUnreads={resetUnreads} 

export default connect(mapStateToProps, actions)(NavBar)