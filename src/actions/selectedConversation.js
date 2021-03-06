import * as variables from '../variables'


export function selectedConversation(convoId) {	
	return dispatch => {
		fetch(`${variables.BASE_URL}/conversations/${convoId}`)
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

export function createConversation(userData, props, userName, user){
	return dispatch => {
		fetch(`${variables.BASE_URL}/conversations`, {
	      method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        Accept: 'application/json'
	      },
	      body: JSON.stringify({
	          title: userData.title,
	          purpose: userData.purpose,
	          creator: userName,
	          user_id: props.currentUser.id
	    })
	  })
		.then(res => res.json())
		.then(data => {
			user.conversations = [...user.conversations, data]
			dispatch({type: "RESET_USER", payload: {user: {...user}}})
			props.history.push(`/conversations/${data.id}`)
		})
	}
}

export function selectUser(user_id){

	return dispatch => {
		fetch(`${variables.BASE_URL}/${user_id}`)
		.then(res => res.json())
		.then(data => {
			dispatch({type: "SELECT_USER", payload: {selectedUser: data}})

		})
	}
}

export function resetSelectedUser(currentUser){
	return dispatch => {
		dispatch({type: "SELECT_USER", payload: {selectedUser: currentUser}})
	}
}

export function joinConversation(user, convo, props){
	return dispatch => {
		user.conversations = [...user.conversations, convo]
		fetch(`${variables.BASE_URL}/join_conversation`, {
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
			dispatch({type: "RESET_USER", payload: {user: {...user}}})
		})
	}
}

export function createDm(dmUsers, currentUser, props){
	return dispatch => {
	let ids = dmUsers.map(user => user.id)
	let allIds = [...ids, currentUser.id]
	let names = dmUsers.map(user => user.first_name).join(", ")

	fetch(`${variables.BASE_URL}/create_dm`, {
		  method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        Accept: 'application/json'
	      },
	      body: JSON.stringify({
	      		title: `${names}, ${currentUser.first_name}`,
	      		dm: true,
	      		user_ids: allIds
	      	})
		})
		.then(res => res.json())
		.then(data =>{
			props.history.push(`/conversations/${data.id}`)
			// currentUser.conversations = [...currentUser.conversations, data]
			// dispatch({type: "RESET_USER", payload: {user: {...currentUser}}})
		})
	}
}

export function viewNotifications(){
	return dispatch => {
		dispatch({type: "VIEW_NOTIFICATIONS", payload: {notifications: true}})
	}
}

export function hideNotifications(){
	return dispatch => {
		dispatch({type: "VIEW_NOTIFICATIONS", payload: {notifications: null}})
	}
}

export function createNotification(title, Id, userId){
return dispatch => {
	fetch(`${variables.BASE_URL}/notifications`,{
		method: 'POST',
	      headers: {
	        'Content-Type': 'application/json',
	        Accept: 'application/json'
	     },
	     body: JSON.stringify({
	     	content: title,
	     	convo_id: Id,
	     	user_id: userId,
	     	timing: new Date().toLocaleTimeString()
	     })
	})
	.then(res=>res.json())
	// .then(data => {
		
	// 	let user = data.find(user => user.id === userId)
	// 	let newNotes = user.notifications.map(notification => {
	//     if (notification.id === data.id){
	//         return data
	//       } else {
	//         return notification
	//       }
	//     })
	//     user.notifications = newNotes
	//     dispatch({type: "RESET_USER", payload: {user: {...user}}})

	// })
  }
}

export function handleNewNotifications(user, data){
  return dispatch => {
    user.notifications = [...user.notifications, data]
    dispatch({type: "RESET_USER", payload: {user: {...user}}})
  	
  }
}



