export function logout() {
  return dispatch => {
    dispatch({type: "LOG_OUT", payload: {user: null, jwt: localStorage.token}})
  }
}