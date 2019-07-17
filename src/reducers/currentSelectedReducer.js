export default function currentSelectedReducer (state={selectedUser: {}, selectedConversation: {}}, action){
	switch(action.type){
		case "SELECT_USER":
			return {...state, selectedUser: action.payload.user}
		case "SELECT_CONVERSATION":
			return {...state, selectedConversation: action.payload.conversation}
		default:
			return state
	}	
}