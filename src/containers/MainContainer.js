import React from 'react'
import ProfileContainer from './ProfileContainer'
import Login from '../components/Login'
import Signup from '../components/Signup'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import CurrentConversation from '../components/CurrentConversation'
import { BrowserRouter as Router, Route } from 'react-router-dom'



class MainContainer extends React.Component {
	render(){
  const token = localStorage.getItem("token")
  return (
    <div className="center-div">
    	<NavBar />
      
      	<div id="main-content">
          <div id="second-main-content">
          	 <Route path="/login" component={ Login } />
             <Route path="/signup" component={ Signup } />
             <Route path='/home' component={ Home } />
             <Route path='/conversations/:id' component={ CurrentConversation } />
          </div>
        </div>

        <ProfileContainer />

    </div>
  	)
	}
}

export default MainContainer
