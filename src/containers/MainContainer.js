import React from 'react'
import ProfileContainer from './ProfileContainer'


class MainContainer extends React.Component {
	render(){
  return (
    <div className="center-div">
    	<div className="nav-bar">
    	Navbar
    	</div> 
      
        Main Container

        <ProfileContainer />

    </div>
  	)
	}
}

export default MainContainer