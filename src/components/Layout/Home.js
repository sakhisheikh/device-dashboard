/* eslint-disable react/no-array-index-key, no-console */
import React, { Component } from 'react';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import Readings from './Readings';
import SearchReading from './SearchReading';
import FilterReadings from '../../helpers/FilterReadings';
import Count from './Count';
import MapLayout from '../Map/MapLayout';
import actions from '../../actions/index';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  leftAnchor: {
    position: 'relative',
  },
});

class Home extends Component {
  state = {
    inputValue: '',
    readingCount: { active: 0, inactive: 0 },
    updateState: false,
  };

  componentDidMount() {
    const { readings } = this.props;
    this.onUpdateReadingCount(readings);
  }

  handleChange = event => {
    const eventVal = event.target.value.trim();
    clearTimeout(this.inputTimer);
    // simple implementation of a "debounce" function, queuing exression for 500ms
    this.inputTimer = setTimeout(() => {
      this.setState({ inputValue: eventVal });
    }, 500);
  };

  onUpdateList = (name, checked) => {
    const { readings, setReadings } = this.props;
    const list = readings.map(reading => {
      if (reading.name === name) {
        return { ...reading, active: checked };
      }
      return reading;
    });
    setReadings(list); // dispatch redux action
    this.setState({
      updateState: true,
    });
  };

  onUpdateReadingCount = readings => {
    const { active, inactive } = readings.reduce(
      (cv, acc) => {
        if (acc.active) {
          cv.active += 1;
        } else {
          cv.inactive += 1;
        }
        return cv;
      },
      { active: 0, inactive: 0 },
    );
    this.setState({
      updateState: false,
      readingCount: { active, inactive },
    });
  };

  getReadingsStat = () => {
    this.toggleDialog();
  };

  toggleDialog = () => {
    this.setState(state => {
      return {
        isReadingDialog: !state.isReadingDialog,
      };
    });
  };

  render() {
    const { inputValue, readingCount, updateState } = this.state;
    const { classes, readings } = this.props;

    return (
      <React.Fragment>
        <Grid container className={classes.root} spacing={8}>
          <Grid item container xs={9} spacing={8}>
            <Grid item xs={12}>
              <SearchReading handleChange={this.handleChange} />
            </Grid>
            <Grid item container xs={12} spacing={24}>
              <FilterReadings
                {...{ inputValue, readings, updateState }}
                onUpdateReadingCount={this.onUpdateReadingCount}
              >
                {({ filterReadings }) => (
                  <Readings
                    onUpdateList={this.onUpdateList}
                    {...{ inputValue, filterReadings }}
                  />
                )}
              </FilterReadings>
            </Grid>
          </Grid>

          <Fade in timeout={2000}>
            <Grid className={classes.leftAnchor} item xs={3}>
              <Grid item container xs={12} spacing={8}>
                <Count {...{ readingCount }} />
              </Grid>
              <Grid item container xs={12} spacing={8}>
                <MapLayout />
              </Grid>
            </Grid>
          </Fade>
        </Grid>

        {/* <ReadingContext.Consumer>
          {({ isReadingsDialog, handleStats }) => (
            <ReadingsStat {...{ handleStats, isReadingsDialog }}>
              {({ readingsStat }) => (
                !readingsStat && (
                  <ReadingsDialog
                    toggleDialog={this.toggleDialog}
                    {...{ readingsStat, isReadingsDialog }}
                  />
                )
              )}
            </ReadingsStat>
          )}
        </ReadingContext.Consumer> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  readings: state.readings.readings,
});

const mapDispatchToProps = dispatch => ({
  setReadings: list => dispatch(actions.setReadings(list)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Home));
