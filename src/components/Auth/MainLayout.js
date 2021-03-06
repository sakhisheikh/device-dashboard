/* eslint-disable */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { Route, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ProtectedRoutes from './ProtectedRoutes';
import authClient from './Auth';
import Loading from '../Loaders/Loading';
import DashboardOptions from '../Layout/DashboardOptions';

const AUTH_GRANT = {
  signIn: () => {
    authClient.signIn();
  },
  signOut: () => {
    authClient.signOut();
  },
};

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    background: '#00C49F',
    width: '100%',
  },
  drawerPaper: {
    position: 'relative',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: '#eee',
    padding: theme.spacing.unit * 3,
  },
});

class MainLayout extends Component {
  state = {
    anchor: 'left',
    isLoading: false,
    isAuthenticated: false,
    isDrawerOpen: false,
  };

  componentDidMount = async () => {
    this.setState({ isLoading: true });
    try {
      await authClient.silentAuth();
      this.setState({
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleClick = access => () => {
    AUTH_GRANT[access]();
  };

  toggleDrawer = ({ isDrawerOpen }) => () => {
    this.setState({ isDrawerOpen });
  };

  render() {
    const { classes } = this.props;
    const { anchor, isAuthenticated, isLoading, isDrawerOpen } = this.state;
    const access =
      isAuthenticated && authClient.isAuthenticated() ? 'signOut' : 'signIn';
    const authenticated =
      isAuthenticated && authClient.isAuthenticated() ? 'Sign Out' : 'Sign In';

    const drawer = (
      <Drawer
        open={isDrawerOpen}
        onClick={this.toggleDrawer({ isDrawerOpen: false })}
        onKeyDown={this.toggleDrawer({ isDrawerOpen: false })}
      >
        <div tabIndex={0} role="button">
          <DashboardOptions className={classes.sideList} />
        </div>
      </Drawer>
    );

    return isLoading ? (
      <Loading />
    ) : (
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar
              position="absolute"
              className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
            >
              <Toolbar disableGutters>
                <Grid alignItems="center" justify="center" direction="row" container className={classes.root} spacing={8}>
                  <Grid item xs={5} >
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.toggleDrawer({ isDrawerOpen: true })}
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6} >
                    <Button
                      align="center"
                      size="large"
                      color="inherit"
                      component={Link}
                      to="/"
                    >
                      Device Dashboard
                  </Button>
                  </Grid>
                  <Button color="inherit" onClick={this.handleClick(access)}>
                    {authenticated}
                  </Button>
                </Grid>
              </Toolbar>
            </AppBar>
            {drawer}
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {isAuthenticated ? (
                <Route render={props => <ProtectedRoutes {...props} />} />
              ) : (
                  <Typography>Please log in to use this app</Typography>
                )}
            </main>
          </div>
        </div>
      );
  }
}

MainLayout.propTypes = {
  classes: PropTypes.object, // Material UI Injected;
};

export default withRouter(withStyles(styles)(MainLayout));
