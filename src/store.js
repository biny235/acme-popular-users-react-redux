import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

//actions
const GET_USERS = 'GET_USERS';
const CREATE_USER = 'CREATE_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

//functions
const fetchUsers = () => {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        store.dispatch({type: GET_USERS, users})
      })
}

const postUser = (user) =>{
  const { id } = user
  const postOrPut = id ? 'put' : 'post'
  const type = id ? UPDATE_USER : CREATE_USER 
  return (dipatch)=>{
    axios[postOrPut](`api/users/${id ? id : ''}`, user)
      .then(res => res.data)
      .then(user => dipatch({type, user}))
  }
}

const deleteUser = (id, history)=>{
  console.log(history)
  return (dispatch)=>{
    return axios.delete(`api/users/${id}`)
      .then(dispatch({type: DELETE_USER, id}))
      .then(()=> history.push('/'))

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
    case DELETE_USER:
      return state.filter(user => user.id !== action.id)
      break;
    default:
      return state;
  }

}

const reducer = combineReducers({
  users: userReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
export { fetchUsers, postUser, deleteUser }