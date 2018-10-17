import React from 'react';
import { connect } from 'react-redux';
import Statistics from '../../../helpers/Statistics';
import ReadingsDialog from '../ReadingsDialog';

function ReadingsStat({ readings }) {
  return (
    <Statistics {...{ readings }}>
      {({ readingsStat }) => <ReadingsDialog {...{ readingsStat }} />}
    </Statistics>
  );
}

const mapStateToProps = state => ({
  readings: state.readings.readings,
});

export default connect(mapStateToProps)(ReadingsStat);
