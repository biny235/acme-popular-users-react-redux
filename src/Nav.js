import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const Nav = ({mostPopular})=>{
  return (
    <ul>
      <li><NavLink to={'/'}>Home</NavLink></li>
      { mostPopular ? 
        <li><NavLink to={`/users/${mostPopular.id}`}>{mostPopular.name} ({mostPopular.rating})</NavLink></li>
        :
        null
      }
      <li><NavLink to={'/createuser'}>Create User</NavLink></li>
    </ul>
  )
};

const mapStateToProps = ({ users })=>{
  return{
    mostPopular: users.length ? users.reduce((highest, next)=>{
      return highest.rating < next.rating ? next : highest
    }) : {}
  }
}

export default connect(mapStateToProps)(Nav);