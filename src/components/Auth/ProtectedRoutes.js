import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../Loaders/Loading';

const Home = Loadable({
  loader: () => import('../Layout/Home'),
  loading: Loading,
});

export default () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
);
