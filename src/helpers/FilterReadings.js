import { Component } from 'react';
import * as SearchUtils from '../utils/MatchSorter';

class FilterReadings extends Component {
  state = {
    inputValue: '',
    filterReadings: [],
    updateState: false,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.inputValue !== prevState.inputValue || nextProps.updateState
    ) {
      return {
        inputValue: nextProps.inputValue,
        filterReadings: nextProps.readings,
        updateState: nextProps.updateState,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { updateState } = this.state;
    const { inputValue } = this.props;
    if (prevProps.inputValue !== inputValue || updateState) {
      const { readings, onUpdateReadingCount } = this.props;
      // Perform some operation here
      const filteredReadings = SearchUtils.MatchSorter({
        inputValue,
        readings,
      });
      onUpdateReadingCount(filteredReadings);
      this.setState(state => {
        return {
          filterReadings: filteredReadings,
          updateState: !state.updateState,
        };
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

export default FilterReadings;
