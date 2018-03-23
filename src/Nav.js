import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ()=>{
  return (
    <ul>
      <li><NavLink to={'/'}>Home</NavLink></li>
      <li><NavLink to={'/createuser'}>Create User</NavLink></li>
    </ul>
  )
};

export default Nav;