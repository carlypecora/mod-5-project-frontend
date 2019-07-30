export function autoLogin(token) {
    
    return dispatch => {
    fetch("http://localhost:3000/auto_login", {
        headers: {
          "Authorization": token
        }
      })
      .then(res => res.json())
      .then(response => {
        if (response.errors){
          localStorage.removeItem("user_id")
          alert(response.errors)
        } else {
            dispatch({type: "AUTO_LOGIN", payload: {user: response, jwt: token}})

        }
    })
  }
}

export function resetUserForDms(user, convo){
  return dispatch =>{
    user.conversations = [...user.conversations, convo]
    dispatch({type: "RESET_USER", payload: {user: {...user}}})
  }
}

export function resetUserForNotifications(user, note){
  return dispatch => {
    let newNotes = user.notifications.map(notification => {
      if (notification.id === note.id){
        return note
      } else {
        return notification
      }
    })
    user.notifications = newNotes
    dispatch({type: "RESET_USER", payload: {user: {...user}}})
  }
}