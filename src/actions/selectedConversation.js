export function selectedConversation(convoId) {
	
	return dispatch => {
		fetch(`http://localhost:3000/conversations/${convoId}`)
		.then(res => res.json())
		.then(data => dispatch({type: "SELECT_CONVERSATION", payload: {currentConversation: data}})
)
	}
}