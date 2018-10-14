import React, { Component } from 'react';
import * as SearchUtils from '../utils/MatchSorter';

class FilterReadings extends Component {
  state = {
    inputValue: null,
    readings: [],
    updateState: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.inputValue !== prevState.inputValue || nextProps.updateState
    ) {
      return {
        inputValue: nextProps.inputValue,
        readings: nextProps.deviceReadings,
        updateState: nextProps.updateState,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { updateState } = this.state;
    const { inputValue } = this.props;
    if (prevProps.inputValue !== inputValue || updateState) {
      const { deviceReadings, onUpdateReadingCount } = this.props;
      // Perform some operation here
      const filterdReadings = SearchUtils.MatchSorter({
        inputValue,
        deviceReadings,
      });
      onUpdateReadingCount(filterdReadings);
      this.setState(state => {
        return {
          readings: filterdReadings,
          updateState: !state.updateState,
        };
      });
    }
  }

  render() {
    const { readings } = this.state;
    const { children, inputValue, deviceReadings } = this.props;
    return children({
      readings: inputValue ? readings : deviceReadings,
    });
  }
}

export default FilterReadings;
