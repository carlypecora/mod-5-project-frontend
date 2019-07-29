import React from 'react'
import * as actions from '../actions/selectedConversation.js'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { IoIosAddCircleOutline } from "react-icons/io"

class ConversationsContainer extends React.Component {

	state = {

		viewAllConvos: false
		
	}

mapThroughAllConversations = () => {

	let userConvoIds = this.props.currentUser.conversations.map(convo => convo.id)
	let removeDms = this.props.conversations.filter(convo => !convo.dm)
	let diff = removeDms.filter(x => !userConvoIds.includes(x.id))
	return diff.map(conversation => {
		return <div key={conversation.id}><Link to={`/conversations/${conversation.id}`} onClick={() => this.props.selectedConversation(conversation.id)} style={{color: 'white', fontSize: 15}}>{conversation.title}</Link></div>
	})
}

mapThroughConversations = () => {
	if (!!this.props.currentUser.conversations){
	let removeDms = this.props.currentUser.conversations.filter(convo => !convo.dm)
	return removeDms.map(conversation => {
		return (
			<div key={conversation.id}>
				<Link to={`/conversations/${conversation.id}`} onClick={() => this.props.selectedConversation(conversation.id)} style={{color: 'white', fontSize: 15}}><div>{conversation.title}</div></Link>
			</div>)
		})
	} else {
		return null
	}
}

renderUserItems = () => {
	return (
	<div>
		<div style={{color: 'white', fontWeight: 'bold', marginLeft: 20, textAlign: 'left', flexDirection: 'row'}}><div style={{display: 'inline'}}>Your Channels:&nbsp;</div><Link to="/conversations/new" className="icon" style={{color: 'white'}} onClick={() => this.props.deselectConversation()}><IoIosAddCircleOutline /></Link></div>
		<div style={{marginRight: 50,  textAlign: 'right', fontSize: 20}}>
			{this.mapThroughConversations()}
		</div>
	</div>
	)
}

renderAllItems = () => {
	return (
	<div style={{marginRight: 50,  textAlign: 'right', fontSize: 20}}>
			{this.mapThroughAllConversations()}
	</div>
	)
}

handleClick = () => {
	this.setState({
		viewAllConvos: !this.state.viewAllConvos
	})
}

mapThroughDms = () => {

	let dms = this.props.currentUser.conversations.filter(convo => !!convo.dm)
	return dms.map(dm => <div key={dm.id}><Link to={`/conversations/${dm.id}`} onClick={() => this.props.selectedConversation(dm.id)} style={{color: 'white', fontSize: 15}}>{dm.title}</Link></div>)
}

renderDms = () => {
	return(
		<div>
			<div style={{marginRight: 50,  textAlign: 'right', fontSize: 20, display: 'block'}}>
		   	  	{this.mapThroughDms()}
		   	</div>
	   	</div>
	)
}

handleMessage =(mess)=>{
	console.log(mess)
}

render(){
  return (
	    <div className="left-sidebar">
	    <h2 style={{marginTop: 5}}><Link to="/home" style={{color: 'white', fontWeight: 'bold'}} onClick={() => this.props.deselectConversation()}>Flatiron Slackers</Link></h2>
	      {!this.props.token ? 
	      	null
	      	:
	      	<div>
	      		<ActionCableConsumer
		          channel={{ channel: 'ConversationsChannel' }}
		          onReceived={this.props.handleReceivedConversation}
		        /><ActionCableConsumer
		          channel={{ channel: 'MessagessChannel' }}
		          onReceived={(mess) => this.handleMessage(mess)}
		        />
		        
		      	<div style={{marginTop: 90, fontSize: 20}}>
		        	{this.renderUserItems()}
		      	</div>
		       	<div style={{flexDirection: 'row', textAlign: 'left', marginLeft: 20, marginTop: 40}}><div style={{color: 'white', fontWeight: 'bold', display: 'inline'}}>All Channels&nbsp;<div onClick={this.handleClick} style={{display: 'inline'}}><IoIosAddCircleOutline /></div></div></div>
	   	  		{this.state.viewAllConvos ?
	   	  			this.renderAllItems()
	   	  			:
	   	  			null
	   	  		}	
	   	  		<div style={{flexDirection: 'row', textAlign: 'left', marginLeft: 20, marginTop: 40}}><div style={{color: 'white', fontWeight: 'bold', display: 'inline'}}>Dms&nbsp;</div><Link to="/dm/new" onClick={() => this.props.deselectConversation()} className="icon" style={{color: 'white'}}><IoIosAddCircleOutline /></Link></div>
	   	  		{this.renderDms()}
	   	  	</div>
	   	  }
	    </div>
	  )
	}
}

function mapStateToProps(state){
	return({...state.auth, ...state.selected})
}

export default connect(mapStateToProps, actions)(ConversationsContainer)