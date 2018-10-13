import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    flexGrow: 1,
  },
  buttonStyle: {
    width: '100% !important',
    margin: 30,
    borderRadius: '8px !important',
    color: '#FFFFFF',
    backgroundColor: 'orange',
    '&:hover': {
      backgroundColor: 'grey',
    },
  },
};

class MapBottomPage extends Component {
  // renderComp = () => {
  //   switch (this.props.currentScreen) {
  //     case 'Confirm':
  //       return <ConfirmTrip setNextScreen={this.setNextScreen} bookRide={this.bookRide} />;
  //       break;
  //     case 'Track':
  //       return <TripTracking setNextScreen={this.setNextScreen} />;
  //       break;
  //     case 'Complete':
  //       return <TripArrived setNextScreen={this.setNextScreen} />;
  //       break;
  //     default:
  //       return <ConfirmTrip setNextScreen={this.setNextScreen} bookRide={this.bookRide} />;
  //       break;
  //   }
  // };

  getDirections = () => {
    return true;
  };

  render() {
    const { classes } = this.props;
    return (
      <Grid className={classes.root} container item xs={12}>
        <Button
          id="yalla"
          onClick={this.getDirections}
          className={classes.buttonStyle}
        >
          Get Directions
        </Button>
      </Grid>
    );
  }
}

export default withStyles(styles)(MapBottomPage);
