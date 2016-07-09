import React, {Component} from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

const Home = () => <h1>Hello from Home!</h1>;
const Address = () => <h1>We are located at 555 Jackson St.</h1>;

export class App extends React.Component {
  constructor() {
   super();
  }

  render() {
    const Xcontainer = () => <div>{this.props.children}</div>;
    return (
        <Router history={hashHistory}>
          <Xcontainer>
            <Route path='/' component={Home} />
            <Route path='/address' component={Address} />
          </Xcontainer>
        </Router>
      );
  }
}
