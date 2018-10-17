import { Component } from 'react';
import PropTypes from 'prop-types';

class Statistics extends Component {
  state = {
    readingsStat: [],
  };

  componentDidMount() {
    console.log("Mounted")
  }

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

// Directions.propTypes = {
//   children: PropTypes.any,
//   latitude: PropTypes.any,
//   longitude: PropTypes.any,
//   isDirection: PropTypes.any,
//   onDirectionsAvailable: PropTypes.func.isRequired,
// };

export default Statistics;