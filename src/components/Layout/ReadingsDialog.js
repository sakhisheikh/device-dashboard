import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
    backgroundColor: 'orange',
  },
  flex: {
    flex: 1,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function ReadingsDialog({ classes }) {
  return (
    <Dialog fullScreen open TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            component={Link}
            to="/"
            color="inherit"
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Device Readings Statistics
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.root} spacing={8}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="row"
          item
          xs={9}
          spacing={8}
        >
          <Grid item>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              PIE CHART (in progress)
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          alignItems="center"
          justify="center"
          direction="row"
          container
          xs={3}
          spacing={8}
        >
          <Grid item>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              GRAPH (in progress)
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}

ReadingsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReadingsDialog);
