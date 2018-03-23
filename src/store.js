import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import axios from 'axios';

const GET_USERS = 'GET_USERS';

const fetchUsers = () => {
    return axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        store.dispatch({type: GET_USERS, users})
      })
  }

const userReducer = (state = [], action)=>{

  switch(action.type){
    case GET_USERS:
      return action.users
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
export { fetchUsers }