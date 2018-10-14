import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
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

MapBottomPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MapBottomPage);
