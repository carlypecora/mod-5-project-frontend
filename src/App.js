import React from 'react';
import './App.css';
import ConversationsContainer from './containers/ConversationsContainer'
import MainContainer from './containers/MainContainer'
import * as actions from './actions/autoLogin.js'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'



class App extends React.Component {

componentDidMount(){
		const token = localStorage.getItem("token")
		if(token){
			this.props.autoLogin(token)
	}
}

render(){
	console.log(this.props)
	  	return (
	  		<Router>
			    <div className="App">
			      <ConversationsContainer />
			      <MainContainer />
			    </div>
		    </Router>
	  	);
	}
}

export default connect(null, actions)(App);
