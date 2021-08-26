import axios from 'axios'
import history from '../history'

const makeCookie = (userId) => {
  const now = new Date();
  let time = now.getTime();
  let withHours = time + 2 * 60 * 60 * 1000
  now.setTime(withHours);
  let expireTime = `expires=${now.toUTCString()}`;
  document.cookie = `cookie=${id};${expireTime}`
}

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({type: SET_AUTH, auth})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  console.log('~~me called!~~')
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    console.log('~~me finished!~~', res)
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (username, password, method, key) => async dispatch => {
  try {
    console.log('~~auth called!~~', 'name: ~~', username, 'pw: ~~', password,'meth: ~~', method)
    const res = await axios.post(`/auth/${method}`, {username, password})
    console.log('~~auth to axios finished!~~', res)
    window.localStorage.setItem(TOKEN, res.data.token)
    //await setToken(username, key)
    dispatch(me())
    
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

const setToken = async(username, key) => {
  console.log('The store is attempting to add the key.....', username, key)
  
  return(console.log('token was set!!'))
}

/**
 * REDUCER
 */
export default function(state = {}, action) {
  console.log('the action!!!', action)
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    default:
      return state
  }
}