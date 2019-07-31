import React from 'react'
import ProfileContainer from './ProfileContainer'
import Login from '../components/Login'
import Signup from '../components/Signup'
import NavBar from '../components/NavBar'
import Home from '../components/Home'
import ConversationForm from '../components/ConversationForm'
import CurrentConversation from '../components/CurrentConversation'
import DmForm from '../components/DmForm'
import { Route, Switch } from 'react-router-dom'




class MainContainer extends React.Component {


	render(){
  return (
    <div className="center-div">
    	<NavBar />
      
      	<div id="main-content">
          <div id="second-main-content">
          <Switch>
          	 <Route path="/login" component={ Login } />
             <Route path="/signup" component={ Signup } />
             <Route path='/home' component={ Home } />
             <Route path='/conversations/new' component={ ConversationForm } />
             <Route path='/dm/new' component ={ DmForm } />
             <Route path='/conversations/:id' render={(routerProps) => <CurrentConversation conversations={this.props.conversations} {...routerProps} />} />
          </Switch>
          </div>
        </div>

        <ProfileContainer />

    </div>
  	)
	}
}


export default MainContainer
