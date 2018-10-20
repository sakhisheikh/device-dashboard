/* eslint-disable operator-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PieChart from '../ReadingCharts/PieChart';
import { CHART_DATA } from '../../utils/Constants';

const styles = {
  root: {
    flexGrow: 1,
  },
  title: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4e6a87',
  },
};

const Count = ({ readingCount, classes }) => {
  return Object.keys(readingCount).map((key, i) => {
    const active = key === 'active';
    return (
      <Grid key={i.toString()} item xs={6}>
        <div align="center">
          <PieChart
            dy={13}
            chartData={CHART_DATA.circle(active)}
            fontSize={40}
            value={readingCount[key]}
          />
        </div>
        <Typography
          align="center"
          className={classes.title}
          color="textSecondary"
        >
          {key.toUpperCase()}
        </Typography>
      </Grid>
    );
  });
};

Count.propTypes = {
  readingCount: PropTypes.object.isRequired,
};

export default withStyles(styles)(Count);
