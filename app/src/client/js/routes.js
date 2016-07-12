import React, {Component} from 'react';
import {About, index, NoMatch, Press} from './containers'
import { Route, IndexRoute } from 'react-router'

const routes = (
<Route path="/" component={index}>
  <Route path="/about" component={About}/>
  <Route path="/press" component={Press}/>
  <Route path="*" component={NoMatch}/>
</Route>
);

export default routes;
