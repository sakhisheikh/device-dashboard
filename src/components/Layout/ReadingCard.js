import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DateIcon from '@material-ui/icons/Timer';
import PieChart from '../ReadingCharts/PieChart';
import ReadingAlert from '../Loaders/ReadingAlert';
import { CHART_DATA } from '../../utils/Constants';

const Shapes = ({ id, value, unit, active }) => {
  switch (id) {
    default:
      return (
        <PieChart chartData={CHART_DATA.circle(active)} {...{ value, unit }} />
      );
  }
};

const styles = {
  root: {
    color: '#00C49F',
    '&$checked': {
      color: '#00C49F',
    },
  },
  checked: {},
  card: {
    border: '1px solid #fafafa',
    backgroundColor: '#fff',
    boxShadow: '0px 3px 7px -1px rgba(0,0,0,.2)',
  },
  loaderBackground: {
    transition: 'opacity 500ms',
  },
  cardContent: {
    margin: 0,
    padding: '5px !important',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    margin: '10px 0',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4e6a87',
  },
  pos: {
    marginBottom: 12,
  },
  loader: {
    color: '#00C49F',
  },
};

class ReadingCard extends Component {
  state = {
    open: false,
    isLoading: false,
  };

  stateReducer = stateValue => {
    this.setState(state => {
      switch (stateValue) {
        case 'open':
          return {
            open: !state.open,
          };
        case 'updateToggle':
          return {
            isLoading: !state.isLoading,
            open: !state.open,
          };
        case 'loading':
          return {
            isLoading: !state.isLoading,
          };
        default:
          return null;
      }
    });
  };

  handleChange = () => {
    this.stateReducer('open');
  };

  handleUpdate = async () => {
    const { name, active, onUpdate } = this.props;
    this.stateReducer('updateToggle');
    await onUpdate(name, !active);
    this.stateReducer('loading');
  };

  render() {
    const { name, unit, value, id, active, timestamp, classes } = this.props;
    const { open, isLoading } = this.state;
    const loaderBackground = isLoading ? classes.loaderBackground : '';

    return (
      <React.Fragment>
        <Card className={`${classes.card} ${loaderBackground}`}>
          <CardContent className={classes.cardContent}>
            <div align="center">
              <Shapes {...{ id, value, unit, active }} />
            </div>
            <Typography
              className={classes.title}
              gutterBottom
              align="center"
              variant="subtitle2"
              component="h2"
            >
              {name}
            </Typography>
            <ListItem disableGutters>
              <ListItemIcon className={classes.control}>
                <DateIcon />
              </ListItemIcon>
              <ListItemText
                secondary={new Date(timestamp).toLocaleTimeString()}
              />
            </ListItem>
            <ListItem disableGutters>
              <ListItemIcon className={classes.control}>
                {isLoading ? (
                  <CircularProgress className={classes.loader} />
                ) : (
                  <Checkbox
                    checked={active}
                    onChange={this.handleChange}
                    classes={{ root: classes.root, checked: classes.checked }}
                  />
                )}
              </ListItemIcon>
              <ListItemText secondary="Active" />
            </ListItem>
          </CardContent>
        </Card>
        <ReadingAlert
          {...{ open }}
          handleChange={this.handleChange}
          handleUpdate={this.handleUpdate}
        />
      </React.Fragment>
    );
  }
}

ReadingCard.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.any,
  unit: PropTypes.any,
  value: PropTypes.any,
  timestamp: PropTypes.any,
  active: PropTypes.any,
  onUpdate: PropTypes.func.isRequired,
  isLoading: PropTypes.string.isRequired,
};

export default withStyles(styles)(ReadingCard);
