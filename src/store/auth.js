import axios from 'axios'
import history from '../history'


/**
 * ACTION TYPES
 */
const SET_TOKEN = 'SET_TOKEN'


 //ACTION CREATORS

const setAuth = token => ({type: SET_TOKEN, token})


 //THUNK CREATORS

export const fetchAccessToken = (tempKey) => async dispatch => {
  try {
    const res = await axios.get(`/auth/${tempKey}`)
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
  } catch (authError) {
    return dispatch(setAuth({error: authError}))
  }
}


 //REDUCER
export default function(state = {}, action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.token
    default:
      return state
  }
}