import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

//actions
const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';
const HANDLE_ERROR = 'HANDLE_ERROR';
const CLEAR_ERROR = 'CLEAR_ERROR';

//functions
const fetchUsers = () => {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        store.dispatch({type: GET_USERS, users})
      })
      .catch(err => console.log(err.response.data))
}

const postUser = (user, history) =>{
  const { id } = user
  const postOrPut = id ? 'put' : 'post'
  const type = id ? UPDATE_USER : CREATE_USER 
  return (dispatch)=>{
    axios[postOrPut](`api/users/${id ? id : ''}`, user)
      .then(res => res.data)
      .then(user => dispatch({type, user}))
      .then(()=> history ? history.push('/') : null)
      .catch(err => dispatch(handleError(err.response.data)))
  }
}

const deleteUser = (id, history)=>{
  return (dispatch)=>{
    return axios.delete(`api/users/${id}`)
      .then(()=> dispatch({type: DELETE_USER, id}))
      .then(()=> history.push('/'))

  }
}

const handleError = (err)=>{
  return {
    type: HANDLE_ERROR,
    err
  }
}

const clearError = ()=>{
  return (dispatch) =>{
    dispatch({type: CLEAR_ERROR})
  }
}

//reducers
const userReducer = (state = [], action)=>{

  switch(action.type){
    case GET_USERS:
      return action.users
      break;
    case CREATE_USER:
      return [...state, action.user]
      break;
    case UPDATE_USER:
      return state.map(user => user.id === action.user.id ? action.user : user)
      break;
    case DELETE_USER:
      return state.filter(user => user.id !== action.id)
      break;
    default:
      return state;
  }

}

const errorReducer = (state = {}, action)=>{
  switch(action.type){
    case HANDLE_ERROR: 
      return action.err
      break;
    case CLEAR_ERROR:
      return {}
      break;
    default:
      return state
  }
}

const reducer = combineReducers({
  users: userReducer,
  error: errorReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
export { fetchUsers, postUser, deleteUser, clearError }