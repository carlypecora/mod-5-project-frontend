export function selectedConversation(convoId) {	
	return dispatch => {
		fetch(`http://localhost:3000/conversations/${convoId}`)
		.then(res => res.json())
		.then(data => dispatch({type: "SELECT_CONVERSATION", payload: {currentConversation: data}})
		)
	}
}

export function resetCurrentConversation(conversation, message){
	return dispatch => {
		conversation.messages = [...conversation.messages, message]
		dispatch({type: "SELECT_CONVERSATION", payload: {currentConversation: conversation}})
	}
}

export function deselectConversation(){
	return dispatch => {
		dispatch({type: "DESELECT_CONVERSATION", payload: {currentConversation: {}}})
	}
}

export function createConversation(userData, props, userName){
	return dispatch => {
		fetch("http://localhost:3000/conversations", {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        Accept: 'application/json'
	      },
	      body: JSON.stringify({
	          title: userData.title,
	          purpose: userData.purpose,
	          creator: userName
	    })
	  })
		.then(res => res.json())
		.then(data => {
			props.history.push(`/conversations/${data.id}`)
			dispatch({type: "SELECT_CONVERSATION", payload: {currentConversation: data}})
			
		})
	}
}

export function joinConversation(user, convo, props){
	return dispatch => {
		user.conversations = [...user.conversations, convo]
		fetch("http://localhost:3000/join_conversation", {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        Accept: 'application/json'
	      },
	      body: JSON.stringify({
	          user_id: user.id,
	          conversation_id: convo.id
	    	})
	 	})
	 	.then(res => res.json())
		.then(data => {
			console.log(user)
			dispatch({type: "RESET_USER", payload: {user: user}})
		})
	}

}
