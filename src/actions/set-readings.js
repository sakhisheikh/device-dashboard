import { REQUEST_SET_READINGS } from './types';

export default function setReadings(readings) {
  return {
    type: REQUEST_SET_READINGS,
    payload: {
      readings,
    },
  };
}
