import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postUser } from './store';

const Users = ({ users, minusRating, plusRating })=>{
  return(
    <div class="card" >
      <div class="card-header">
        Users
      </div>
      <ul className="list-group list-group-flush">
        {
          users.map(user => {
            return (
              <li key={user.id} className="list-group-item">
                <Link to={`users/${user.id}`}>
                  { user.name }
                </Link>
                <br />
                <button onClick={()=> minusRating(user)}>-</button>
                <span> ({ user.rating }) </span>
                <button onClick={()=> plusRating(user)} >+</button>
              </li>
          )})
        }
      </ul>
    </div>
  )
};

const mapDispatchToProps = (dispatch) =>{
  return{
    minusRating: (user)=>dispatch(postUser(Object.assign(user, {rating: user.rating - 1}))),
    plusRating: (user)=>dispatch(postUser(Object.assign(user, {rating: user.rating + 1})))
  }
}

const mapStateToProps = (state)=>{
  return{
    users: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);