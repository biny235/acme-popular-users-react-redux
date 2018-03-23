import React from 'react';
import { Route, Switch } from 'react-router-dom';


import Nav from './Nav';
import Users from './Users';
import UserForm from './UserForm';

const Main = () => {
  return(
    <div>
      <Nav />
      <Switch>
        <Route exact path='/' render={ () => <Users /> }/>
        <Route path='/users/:id' render={ ({match, history}) => <UserForm history={history} id={match.params.id * 1}/> } />
        <Route path='/createuser' render={ ({history}) => <UserForm history={history}/> } />
      </Switch>
    </div>
  )
};

export default Main;
