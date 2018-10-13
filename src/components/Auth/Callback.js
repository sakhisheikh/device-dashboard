import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import authClient from './Auth';

class Callback extends Component {
  componentDidMount() {
    const { history } = this.props;
    authClient.handleAuthentication().then(() => {
      history.push('/');
    });
  }

  render() {
    return <div>Loading...</div>;
  }
}

Callback.propTypes = {
  history: PropTypes.object, // react-router-dom Injected;
};

export default withRouter(Callback);
