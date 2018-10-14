import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function ReadingAlert({ handleUpdate, handleChange, open }) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {'Toggle Reading'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Do you agree to perform this action?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleChange} color="primary">
          Disagree
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ReadingAlert.propTypes = {
  open: PropTypes.any,
  handleUpdate: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ReadingAlert;
