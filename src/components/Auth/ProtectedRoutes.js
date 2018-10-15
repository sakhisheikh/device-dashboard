import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import Loading from '../Loaders/Loading';
import actions from '../../actions/index';

const Home = Loadable({
  loader: () => import('../Layout/Home'),
  loading: Loading,
});

const ReadingsStats = Loadable({
  loader: () => import('../Layout/readings/ReadingsStat'),
  loading: Loading,
});

class ProtectedRoutes extends Component {
  componentDidMount() {
    this.onGetReadings();
  }

  onGetReadings = async () => {
    const { getReadings } = this.props;
    try {
      await getReadings();
    } catch (error) {
      // console.log('Request canceled', error.message);
    }
  };

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/readings-stats" component={ReadingsStats} />
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
  readings: state.readings.readings,
});

const mapDispatchToProps = dispatch => ({
  getReadings: () => dispatch(actions.getDeviceReadings()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProtectedRoutes);
