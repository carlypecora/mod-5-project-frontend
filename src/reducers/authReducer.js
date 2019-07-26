export default function authReducer (state={currentUser: {}, token: null, selectedUser: {}}, action){
	switch(action.type){
		case "LOG_IN":
			localStorage.setItem('jwt', action.payload.jwt)
			return {...state, currentUser: action.payload.user, selectedUser: action.payload.user, token: action.payload.jwt}
		case "RESET_USER":
			return {...state, currentUser: action.payload.user}
		case "SELECT_USER":
			return {...state, selectedUser: action.payload.selectedUser}
		case "LOG_OUT":
		    localStorage.removeItem('jwt')
			return {...state, currentUser:{}, selectedUser: {}, token: action.payload.jwt } 
		case "AUTO_LOGIN":
			return {...state, currentUser: action.payload.user, selectedUser: action.payload.user, token: action.payload.jwt}
		default:
			return state
	}
	
}