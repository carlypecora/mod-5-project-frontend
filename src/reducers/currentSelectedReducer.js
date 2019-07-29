export default function currentSelectedReducer (state={currentConversation: {}, notifications: null}, action){
	switch(action.type){
		case "SELECT_USER":
			return {...state, selectedUser: action.payload.user}
		case "SELECT_CONVERSATION":
			return {...state, currentConversation: action.payload.currentConversation}
		case "DESELECT_CONVERSATION":
			return {...state, currentConversation: action.payload.currentConversation}
		case "VIEW_NOTIFICATIONS":
			return {...state, notifications: action.payload.notifications}
		default:
			return state
	}	
}