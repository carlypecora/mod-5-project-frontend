import React from 'react'
import * as actions from '../actions/selectedConversation.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { IoIosAddCircleOutline } from "react-icons/io"

class ConversationsContainer extends React.Component {

mapThroughConversations = () => {
	return this.props.conversations.map(conversation => {
		return <div key={conversation.id}><Link to={`/conversations/${conversation.id}`} onClick={() => this.props.selectedConversation(conversation.id)} style={{color: 'white'}}>{conversation.title}</Link></div>
	})
}

renderItems = () => {
	return !this.props.token ?
		null
	:
	<div>
		<ActionCableConsumer
          channel={{ channel: 'ConversationsChannel' }}
          onReceived={this.props.handleReceivedConversation}
        />
		<div style={{color: 'white', fontWeight: 'bold', marginLeft: 20, textAlign: 'left', flexDirection: 'row'}}><div style={{display: 'inline'}}>Your Channels:&nbsp;</div><Link to="/conversations/new" id="icon" style={{color: 'white'}} onClick={() => this.props.deselectConversation()}><IoIosAddCircleOutline /></Link></div>
		<div style={{marginRight: 110,  textAlign: 'right', fontSize: 20}}>
			{this.mapThroughConversations()}
		</div>
	</div>
 
}

render(){
  return (
	    <div className="left-sidebar">
	    <h2 style={{marginTop: 5}}><Link to="/home" style={{color: 'white', fontWeight: 'bold'}} onClick={() => this.props.deselectConversation()}>Flatiron Slackers</Link></h2>
	      
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