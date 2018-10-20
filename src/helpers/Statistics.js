import { Component } from 'react';
import PropTypes from 'prop-types';

class Statistics extends Component {
  state = {
    readingsStat: [],
  };

  // componentDidMount() {
  //   console.log('Mounted');
  // }

  // onInitializeStatistics = () => {

  // };

  render() {
    const { readingsStat } = this.state;
    const { children } = this.props;
    return children({
      readingsStat,
    });
  }
}

Statistics.propTypes = {
  children: PropTypes.any,
};

export default Statistics;
