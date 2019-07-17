import React from 'react'
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

mapThroughConversations = () => {
	return this.state.conversations.map(conversation => {
		return <div key={conversation.id}><Link style={{color: 'white'}}>{conversation.title}</Link></div>
	})
}

renderItems = () => {
	return !this.props.token ?
		null
	:
		this.mapThroughConversations()
}

render(){
	console.log(this.props)
  return (
	    <div className="left-sidebar">
	    <h4 style={{marginTop: 5}}><Link to="/home" style={{color: 'white'}}>Flatiron Slackers</Link></h4>
	      
	      <div style={{marginTop: 100}}>
	        {this.renderItems()}
	       </div>
	    </div>
	  )
	}
}

function mapStateToProps(state){
	return({...state.auth})
}

export default connect(mapStateToProps)(ConversationsContainer)