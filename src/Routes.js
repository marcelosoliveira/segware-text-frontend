import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignUpForm from './pages/SignUpForm';
import Login from './pages/Login';


const Rotas = () => (
  <Switch>
    <Route exact path="/" component={SignUpForm} />
    <Route  path="/login" component={Login} />
  </Switch>
);

export default Rotas;

