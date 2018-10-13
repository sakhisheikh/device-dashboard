import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ProtectedRoutes from './ProtectedRoutes';
import authClient from './Auth';
import Loading from '../Loaders/Loading';

const drawerWidth = 0;

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
  grow: {
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
    background: 'orange',
    width: `calc(100% - ${drawerWidth}px)`,
  },
  'appBar-left': {
    marginLeft: drawerWidth,
  },
  'appBar-right': {
    marginRight: drawerWidth,
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: 'theme.palette.background.default',
    padding: theme.spacing.unit * 3,
  },
});

class MainLayout extends Component {
  state = {
    anchor: 'left',
    isLoading: false,
    isAuthenticated: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    authClient
      .silentAuth()
      .then(() => {
        this.setState({
          isAuthenticated: true,
          isLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false,
        });
      });
  }

  handleClick = access => () => {
    AUTH_GRANT[access]();
  };

  render() {
    const { classes } = this.props;
    const { anchor, isAuthenticated, isLoading } = this.state;
    const access =
      isAuthenticated && authClient.isAuthenticated() ? 'signOut' : 'signIn';
    const authenticated =
      isAuthenticated && authClient.isAuthenticated() ? 'Sign Out' : 'Sign In';

    // const drawer = (
    //   <Drawer
    //     variant="permanent"
    //     classes={{
    //       paper: classes.drawerPaper,
    //     }}
    //     anchor={anchor}
    //   >
    //     <div className={classes.toolbar} />
    //     <NotesOptions />
    //   </Drawer>
    // );

    return isLoading ? (
      <Loading />
    ) : (
        <div className={classes.root}>
          <div className={classes.appFrame}>
            <AppBar
              position="absolute"
              className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
            >
              <Toolbar>
                <Typography
                  className={classes.grow}
                  variant="title"
                  color="inherit"
                  noWrap
                >
                  Device Dashboard
              </Typography>
                <Button color="inherit" onClick={this.handleClick(access)}>
                  {authenticated}
                </Button>
              </Toolbar>
            </AppBar>
            {/* {drawer} */}
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {isAuthenticated ? (
                <ProtectedRoutes />
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
