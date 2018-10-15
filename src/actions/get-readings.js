import { getDeviceReadings as getDeviceReadingsAPI } from '../api/device';

import {
  REQUEST_GET_READINGS,
  REQUEST_GET_READINGS_SUCCESS,
  REQUEST_GET_READINGS_FAILURE,
} from './types';

function requestgetDeviceReadings() {
  return {
    type: REQUEST_GET_READINGS,
  };
}

function requestgetDeviceReadingsSuccess(json) {
  return {
    type: REQUEST_GET_READINGS_SUCCESS,
    payload: {
      readings: json,
    },
  };
}

function requestgetDeviceReadingsFailure(error) {
  return {
    type: REQUEST_GET_READINGS_FAILURE,
    payload: error,
    error: true,
  };
}

export default function getDeviceReadings() {
  return async dispatch => {
    try {
      dispatch(requestgetDeviceReadings());
      const readings = await getDeviceReadingsAPI();
      dispatch(requestgetDeviceReadingsSuccess(readings));
      return readings;
    } catch (error) {
      dispatch(requestgetDeviceReadingsFailure(error));
      return error;
    }
  };
}
