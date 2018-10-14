import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

function SearchReading({ handleChange }) {
  return (
    <TextField
      id="filled-full-width"
      label="Reading Search"
      style={{ margin: 8 }}
      onChange={handleChange}
      placeholder="Search reading by name"
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
}

SearchReading.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SearchReading;
