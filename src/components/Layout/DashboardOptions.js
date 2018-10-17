import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ReadingContext from './context/ReadingsContext';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class DashboardOptions extends Component {
  state = {
    isReadinsDialog: false,
  };

  handleStats = () => {
    this.setState(state => {
      return {
        isReadinsDialog: !state.isReadinsDialog,
      };
    });
  };

  render() {
    const { classes } = this.props;
    const { isReadinsDialog } = this.state;
    return (
      <div className={classes.root}>
        <List component="nav">
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/readings-stats">
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ReadingContext.Provider
              value={{ isReadinsDialog, handleStats: this.handleStats }}
            >
              <ListItemText primary="Readings Stats" />
            </ReadingContext.Provider>
          </ListItem>
        </List>
        <Divider />
      </div>
    );
  }
}

DashboardOptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardOptions);
