export default function authReducer (state={currentUser: {}, token: null}, action){
	switch(action.type){
		case "LOG_IN":
			localStorage.setItem('jwt', action.payload.jwt)
			return {...state, currentUser: action.payload.user, token: action.payload.jwt}
		// case "LOG_OUT":
		//     localStorage.removeItem('jwt')
		// 	return {currentUser:{}, loggedIn:false} 
		// case "GET_CURRENT_USER":
		// 	return {currentUser: action.payload.user, loggedIn:true}
		default:
			return state
	}
	
}