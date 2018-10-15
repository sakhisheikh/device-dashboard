/* eslint-disable react/no-array-index-key, no-console */
import React, { Component } from 'react';
// Material-UI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Fade from '@material-ui/core/Fade';
import * as DEVICE from '../../api/device';
import Readings from './Readings';
import SearchReading from './SearchReading';
import FilterReadings from '../../helpers/FilterReadings';
import Count from './Count';
import MapLayout from '../Map/MapLayout';
import ReadingsDialog from './ReadingsDialog';
import ReadingContext from './context/ReadingsContext';
import ReadingsStat from './readings/ReadingsStat';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  leftAnchor: {
    position: 'absolute',
    left: '75%',
  },
  mapLayout: {
    border: '2px solid orange',
    borderRadius: '8px',
  },
});

class Home extends Component {
  state = {
    deviceReadings: [],
    filter: 'name',
    inputValue: '',
    readingCount: { active: 0, inactive: 0 },
    updateState: false,
    isReadingDialog: false,
  };

  componentDidMount() {
    DEVICE.getDeviceReadings().then(res => {
      const { data } = res;
      this.setState(
        {
          deviceReadings: data,
        },
        () => {
          const { deviceReadings } = this.state;
          this.onUpdateReadingCount(deviceReadings);
        },
      );
    });
  }

  handleChange = event => {
    const eventVal = event.target.value.trim();
    setTimeout(() => {
      this.setState({ inputValue: eventVal });
    }, 1000);
  };

  onUpdateList = (name, checked) => {
    const { deviceReadings } = this.state;
    const list = deviceReadings.map(reading => {
      if (reading.name === name) {
        return { ...reading, active: checked };
      }
      return reading;
    });
    this.setState({
      deviceReadings: list,
      updateState: true,
    });
  };

  onUpdateReadingCount = reading => {
    const { active, inactive } = reading.reduce(
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
    this.setState(state => {
      return {
        updateState: !state.updateState,
        readingCount: { active, inactive },
      };
    });
  };

  getReadingsStat = () => {
    console.log('GET READINGS STAT');
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
    const {
      deviceReadings,
      inputValue,
      filter,
      readingCount,
      updateState,
      isReadingDialog,
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Grid container className={classes.root} spacing={8}>
          <Grid item container xs={9} spacing={8}>
            <Grid item xs={12}>
              <SearchReading handleChange={this.handleChange} />
            </Grid>
            <Grid item container xs={12} spacing={8}>
              <FilterReadings
                {...{ filter, inputValue, deviceReadings, updateState }}
                onUpdateReadingCount={this.onUpdateReadingCount}
              >
                {({ readings }) => (
                  <Readings
                    onUpdateReadingCount={this.onUpdateReadingCount}
                    onUpdateList={this.onUpdateList}
                    {...{ inputValue, readings }}
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
              <Grid
                className={classes.mapLayout}
                item
                container
                xs={12}
                spacing={8}
              >
                <MapLayout />
              </Grid>
            </Grid>
          </Fade>
        </Grid>

        <ReadingContext.Consumer>
          {({ isReadingsDialog, handleStats }) => (
            <ReadingsStat
              {...{ deviceReadings, handleStats, isReadingsDialog }}
            >
              {({ readingsStat }) => (
                <ReadingsDialog
                  toggleDialog={this.toggleDialog}
                  {...{ readingsStat, isReadingsDialog }}
                />
              )}
            </ReadingsStat>
          )}
        </ReadingContext.Consumer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
