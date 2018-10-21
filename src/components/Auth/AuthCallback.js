import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import authClient from './Auth';

class AuthCallback extends Component {
  componentDidMount = async () => {
    const { history } = this.props;
    try {
      await authClient.handleAuthentication();
      history.push('/');
    } catch (error) {
      history.push('/');
    }
  };

  render() {
    return <div>Loading...</div>;
  }
}

AuthCallback.propTypes = {
  history: PropTypes.object, // react-router-dom Injected;
};

export default withRouter(AuthCallback);
