import React from 'react';
import { Route } from 'react-router-dom';

import Nav from './Nav'
import Users from './Users'

const Main = () => {
  return(
    <div>
      <Nav />
      <Route exact path='/' render={()=> <Users />}/>
    </div>
  )
}

export default Main;
