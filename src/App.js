import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from './components/Loaders/Loading';

// dynamic imports
const AuthCallback = Loadable({
  loader: () => import('./components/Auth/AuthCallback'),
  loading: Loading,
});

const MainLayout = Loadable({
  loader: () => import('./components/Auth/MainLayout'),
  loading: Loading,
});

export default () => (
  <Switch>
    {/* Auht0 Authentication Callback */}
    <Route path="/callback" render={() => <AuthCallback />} />
    <Route path="/" render={() => <MainLayout />} />
  </Switch>
);
