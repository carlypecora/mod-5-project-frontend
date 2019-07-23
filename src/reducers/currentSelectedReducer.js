export default function currentSelectedReducer (state={selectedUser: {}, currentConversation: {}}, action){
	switch(action.type){
		case "SELECT_USER":
			return {...state, selectedUser: action.payload.user}
		case "SELECT_CONVERSATION":
			return {...state, currentConversation: action.payload.currentConversation}
		case "DESELECT_CONVERSATION":
			return {...state, currentConversation: action.payload.currentConversation}
		default:
			return state
	}	
}