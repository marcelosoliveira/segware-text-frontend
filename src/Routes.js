import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUpForm from './pages/SignUpForm';
import Post from './pages/Post';

const Router = () => (
  <Switch>
    <Route exact path="/" component={SignUpForm} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/home" component={Home} />
    <Route exact path="/post" component={Post} />
  </Switch>
);

export default Router;
