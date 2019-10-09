import React from 'react';
import './App.css';
import ConversationsContainer from './containers/ConversationsContainer'
import MainContainer from './containers/MainContainer'
import * as actions from './actions/autoLogin.js'
import * as variables from './variables'
import { connect } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'



class App extends React.Component {

state = {
	conversations: []
}

componentDidMount(){
	console.log(variables.BASE_URL)
		const token = localStorage.getItem("token")
			fetch(`${variables.BASE_URL}/conversations`)
					.then(res => res.json())
					.then(data => {
						this.setState({
							conversations: data
				})
			})
		if(token){
			this.props.autoLogin(token)

	}
}

handleReceivedConversation = response => {
	console.log("convo response", response)
	if (!!response.dm){
		this.props.resetUserForDms(this.props.currentUser, response) 
	} else {
		this.setState({
      		conversations: [...this.state.conversations, response]
    	})
	}
  }

handleReceivedMessage = response => {
	console.log("msg response")
	const { message } = response;
	const conversations = [...this.state.conversations];
	const conversation = conversations.find(
	  conversation => conversation.id === message.conversation_id
	)
	conversation.messages = [...conversation.messages, message]
	this.setState({ conversations })
}


render(){
	  	return (
	  		<Router>
			    <div className="App">
			      <ConversationsContainer handleReceivedMessage={this.handleReceivedMessage} handleReceivedConversation={this.handleReceivedConversation} conversations={this.state.conversations}/>
			      <MainContainer handleReceivedConversation={this.handleReceivedConversation} conversations={this.state.conversations} />
			    </div>
		    </Router>
	  	);
	}
}


function mapStateToProps(state){
	return ({...state.auth})
}

export default connect(mapStateToProps, actions)(App);
