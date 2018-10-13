import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  progress: {
    height: '100vh',
    position: 'fixed',
    zIndex: 999999,
    backgroundColor: 'rgba(255,255,255, 0.7)',
    transition: 'opacity 500ms',
  },
  loader: {
    color: 'orange',
  },
});

function Loading({ classes }) {
  return (
    <div>
      <Grid item id="loadingGrid" xs={12} className={classes.root}>
        <Grid
          container
          className={classes.progress}
          alignItems="center"
          direction="row"
          justify="center"
        >
          <CircularProgress className={classes.loader} />
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Loading);