import React from 'react'
import ProfileContainer from './ProfileContainer'
import Login from '../components/Login'


class MainContainer extends React.Component {
	render(){
  return (
    <div className="center-div">
    	<div className="nav-bar">
    	Navbar
    	</div> 
      
      	<div id="main-content">
          <div id="second-main-content">
          
        	 <Login />
          </div>
        </div>

        <ProfileContainer />

    </div>
  	)
	}
}

export default MainContainer