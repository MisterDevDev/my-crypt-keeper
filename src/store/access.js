  
// import axios from "axios";

// /**
//  * ACTION TYPES
//  */
// const SET_ACCESS = "SET_ACCESS";

// /**
//  * ACTION CREATORS
//  */
// const setKey = (key) => ({ type: SET_ACCESS, key });

// /**
//  * THUNK CREATORS
//  */
// export const setAccess = (key) => async (dispatch) => {
//   try {
//     console.log('I am being used access!!!!!!!!!!!!!!!!!!!');
//     return dispatch(setKey(res.data));
//   } catch (err) {
//     console.log(err);
//   }
// };

// /**
//  * REDUCER
//  */
// export default function (state = [], action) {
//   switch (action.type) {
//     case SET_ACCESS:
//       return action.key;
//     default:
//       return state;
//   }
// }