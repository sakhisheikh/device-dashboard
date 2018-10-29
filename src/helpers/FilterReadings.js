/* eslint-disable react/no-did-update-set-state */
import { Component } from 'react';
import PropTypes from 'prop-types';
import * as SearchUtils from '../utils/MatchSorter';

class FilterReadings extends Component {
  state = {
    filterReadings: [],
  };

  componentDidUpdate(prevProps) {
    const { inputValue, readings } = this.props;
    if (
      prevProps.inputValue !== inputValue ||
      prevProps.readings !== readings
    ) {
      const { onUpdateReadingCount } = this.props;
      // Perform some operation here
      const filteredReadings = SearchUtils.MatchSorter({
        inputValue,
        readings,
      });
      onUpdateReadingCount(filteredReadings);
      this.setState({
        filterReadings: filteredReadings,
      });
    }
  }

  render() {
    const { filterReadings } = this.state;
    const { children, inputValue, readings } = this.props;
    return children({
      filterReadings: inputValue ? filterReadings : readings,
    });
  }
}

FilterReadings.propTypes = {
  children: PropTypes.any,
  inputValue: PropTypes.any,
  readings: PropTypes.any,
  onUpdateReadingCount: PropTypes.func.isRequired,
};

export default FilterReadings;
