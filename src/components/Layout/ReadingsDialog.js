import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { PieChart, Pie, Cell } from 'recharts';
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

const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
{ name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

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
  return <Slide timeout={5000} in direction="up" {...props} />;
}

class ReadingsDialog extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    this.toggleDialog();
  }

  componentWillUnmount() {
    this.toggleDialog();
  }

  toggleDialog = () => {
    this.setState(state => {
      return {
        open: !state.open,
      };
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <Dialog fullScreen {...{ open }} TransitionComponent={Transition}>
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
              <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
                <Pie
                  data={data}
                  cx={120}
                  cy={200}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {data.map((_, index) => (
                    <Cell fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Pie
                  data={data}
                  cx={420}
                  cy={200}
                  startAngle={180}
                  endAngle={0}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  label
                >
                  {
                    data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
              </PieChart>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    );
  }
}

ReadingsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReadingsDialog);
