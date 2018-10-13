import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import Reading from './Reading';
import * as DEVICE from '../../api/device';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

class Readings extends Component {
  state = {
    isLoading: '',
    isSnackbarOpen: false,
    snackbarMessage: '',
  };

  onUpdateToggleStatus = async (name, checked) => {
    const { readings } = this.props;
    const { onUpdateReadingCount, onUpdateList } = this.props;
    try {
      this.setState({ isLoading: name });
      const result = await DEVICE.toggleDeviceStatus({
        readingName: name,
        stateValue: checked,
      });
      const list = readings.map(reading => {
        if (reading.name === name) {
          return { ...reading, active: checked };
        }
        return reading;
      });
      onUpdateList(name, checked);
      onUpdateReadingCount(list);
      this.setState({
        isLoading: '',
        isSnackbarOpen: true,
        snackbarMessage: 'Reading Successfully Updated',
      });
      return result.success;
    } catch (error) {
      this.setState({
        isLoading: '',
        isSnackbarOpen: true,
        snackbarMessage: error.response.data.message,
      });
      return error.response.data.success;
    }
  };

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isSnackbarOpen: false });
  };

  render() {
    const { isLoading, isSnackbarOpen, snackbarMessage } = this.state;
    const { readings } = this.props;

    const allList = readings.map((device, i) => (
      <Fade key={i.toString()} in timeout={1000}>
        <Grid item xs={2}>
          <Reading
            {...device}
            onUpdate={this.onUpdateToggleStatus}
            isLoading={isLoading}
          />
        </Grid>
      </Fade>
    ));

    return (
      <React.Fragment>
        {allList}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={isSnackbarOpen}
          autoHideDuration={2000}
          onClose={this.handleCloseSnackbar}
          message={<span id="message-id">{snackbarMessage}</span>}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Readings);
