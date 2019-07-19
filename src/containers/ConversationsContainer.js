import React from 'react'
import * as actions from '../actions/selectedConversation.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


class ConversationsContainer extends React.Component {

state = {
	conversations: []
}

componentDidMount(){
	fetch('http://localhost:3000/conversations')
	.then(res => res.json())
	.then(data => {
		this.setState({
			conversations: data
		})
	})
}

mapThroughConversations = (conversations) => {
	return this.state.conversations.map(conversation => {
		return <div key={conversation.id}><Link to={`/conversations/${conversation.id}`} onClick={() => this.props.selectedConversation(conversation.id)} style={{color: 'white'}}>{conversation.title}</Link></div>
	})
}

renderItems = () => {
	return !this.props.token ?
		null
	:
	<div>
		<div style={{color: 'white', fontWeight: 'bold', marginLeft: 20, textAlign: 'left'}}>Your Channels:</div>
		<div style={{marginRight: 110,  textAlign: 'right', fontSize: 20}}>
			{this.mapThroughConversations()}
		</div>
	</div>
		  
}

render(){
  return (
	    <div className="left-sidebar">
	    <h2 style={{marginTop: 5}}><Link to="/home" style={{color: 'white', fontWeight: 'bold'}}>Flatiron Slackers</Link></h2>
	      
	      <div style={{marginTop: 90, fontSize: 20}}>
	        {this.renderItems()}
	       </div>
	    </div>
	  )
	}
}

function mapStateToProps(state){
	return({...state.auth, ...state.selected})
}

export default connect(mapStateToProps, actions)(ConversationsContainer)