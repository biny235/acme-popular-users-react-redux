import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = ()=>{
  return (
    <ul>
      <li><NavLink to={'/'}>Home</NavLink></li>
    </ul>
  )
};

export default Nav;