import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearError } from './store';

const Nav = (props)=>{
  const { mostPopular, handleClear} = props;
  return (
    <ul className="nav">
      <li><NavLink to='/'className="nav-link" >Home</NavLink></li>
      { mostPopular ? 
        <li><NavLink to={`/users/${mostPopular.id}`} className="nav-link" onClick={handleClear} >
        {mostPopular.name} ({mostPopular.rating})
        </NavLink></li>
        :
        null
      }
      <li><NavLink to='/createuser' className="nav-link" onClick={handleClear}>Create User</NavLink></li>
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

const mapDispatchToProps = (dispatch)=>{
  return{
    handleClear: ()=> dispatch(clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);