import {
  REQUEST_GET_READINGS,
  REQUEST_GET_READINGS_SUCCESS,
  REQUEST_GET_READINGS_FAILURE,
  REQUEST_SET_READINGS,
} from '../actions/types';

export default function reducer(
  state = {
    readings: {},
  },
  action = { type: '' },
) {
  switch (action.type) {
    case REQUEST_GET_READINGS:
      return {
        ...state,
      };
    case REQUEST_GET_READINGS_SUCCESS:
      return {
        ...state,
        readings: action.payload.readings,
      };
    case REQUEST_GET_READINGS_FAILURE:
      return {
        ...state,
      };

    case REQUEST_SET_READINGS:
      return {
        ...state,
        readings: action.payload.readings,
      };
    default:
      return state;
  }
}
