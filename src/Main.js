import React from 'react';
import { Route } from 'react-router-dom';


import Nav from './Nav';
import Users from './Users';
import UserForm from './UserForm';

const Main = () => {
  return(
    <div>
      <Nav />
      <Route exact path='/' render={ () => <Users /> }/>
      <Route path='/users/:id' render={ ({match}) => <UserForm id={match.params.id * 1}/> } />
    </div>
  )
};

export default Main;
