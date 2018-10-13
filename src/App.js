import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loaders/Loading';

// dynamic imports
const AuthCallback = Loadable({
  loader: () => import('./components/Auth/Callback'),
  loading: Loading,
});

const MainLayout = Loadable({
  loader: () => import('./components/Auth/MainLayout'),
  loading: Loading,
});

export default () => (
  <Switch>
    <Route path="/callback" render={() => <AuthCallback />} />
    <Route path="/" render={() => <MainLayout />} />
  </Switch>
);
