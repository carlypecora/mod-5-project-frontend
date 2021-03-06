import * as variables from '../variables'

export function login(userData, props) {
    return dispatch => {
    fetch(`${variables.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: userData.email,
          password: userData.password
        }
      })
    })
    .then(r => r.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors);
      } else {
        localStorage.setItem("token", data.token);
        props.history.push('/home')
        dispatch({type: "LOG_IN", payload: {user: data.user, jwt: data.token}})
      }
    })
  }
}

export function signup(userData, props, password){
  return dispatch => {
    fetch(`${variables.BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
      },
        body: JSON.stringify({
          first_name: userData.first_name,
          last_name: userData.last_name,
          email: userData.email,
          password: password,
          bio: userData.bio,
          photo_url: userData.photo_url
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors);
      } else {
        localStorage.setItem("token", data.token);
        props.history.push('/home')
        dispatch({type: "LOG_IN", payload: {user: data.user, jwt: data.token}})
      }
    })
  }
}