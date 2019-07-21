export function login(userData, props) {
    console.log("hit login reducer")
    return dispatch => {
    fetch('http://localhost:3000/login', {
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
      if (data.message) {
        alert(data.message);
      } else {
        localStorage.setItem("token", data.token);
        props.history.push('/home')
        dispatch({type: "LOG_IN", payload: {user: data.user, jwt: data.token}})
      }
    })
  }
}

// export function signin(state){
//   return dispatch => {
//     fetch('http://localhost:3000/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json'
//       },
//         body: JSON.stringify({
//           user: {

//           }
//         })
//       }
//     )
//   }
// }