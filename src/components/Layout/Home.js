/* eslint-disable react/no-array-index-key, no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  leftAnchor: {
    position: 'absolute',
    left: '75%',
  },
});

class Home extends Component {
  state = {
    deviceReadings: [],
    filter: 'name',
    inputValue: '',
    readingCount: { active: 0, inactive: 0 },
    updateState: false,
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

  render() {
    const {
      deviceReadings,
      inputValue,
      filter,
      readingCount,
      updateState,
    } = this.state;
    const { classes } = this.props;

    return (
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
            <Grid item container xs={12} spacing={8}>
              <MapLayout />
            </Grid>
          </Grid>
        </Fade>
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
