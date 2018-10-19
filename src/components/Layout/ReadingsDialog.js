import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import { PieChart, Pie, Cell, Sector, Legend } from 'recharts';
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

const data = [{ name: 'Group A', value: 0.06 }, { name: 'Group B', value: 0.04 },
{ name: 'Group C', value: 0.1 }];
const COLORS = ['#0088FE', '#00C49F', '#FF8042'];

// const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 },
// { name: 'Group C', value: 300 }, { name: 'Group D', value: 200 }];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#00C49F',
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
    activeIndex: 0,
  };

  componentDidMount() {
    this.toggleDialog();
  }

  componentWillUnmount() {
    this.toggleDialog();
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
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
              <PieChart width={800} height={400}>
                <Pie
                  activeIndex={this.state.activeIndex}
                  activeShape={renderActiveShape}
                  data={data}
                  cx={300}
                  cy={200}
                  innerRadius={100}
                  outerRadius={160}
                  fill="#8884d8"
                  onMouseEnter={this.onPieEnter}
                >
                  {
                    data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
                  }
                </Pie>
                <Legend layout="vertical" align="center" verticalAlign="bottom" height={36} />
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
