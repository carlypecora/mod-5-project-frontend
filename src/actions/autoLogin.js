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