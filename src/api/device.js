import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8888';

export const getDeviceReadings = () => {
  const URL = `${BASE_URL}/device`;
  return axios(URL, {
    method: 'GET',
  })
    .then(response => {
      // handle success
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};

export const toggleDeviceStatus = ({ readingName, stateValue }) => {
  const URL = `${BASE_URL}/device/${readingName}?active=${stateValue}`;
  return axios(URL, {
    method: 'PATCH',
  })
    .then(response => {
      // handle success
      return response.data;
    })
    .catch(error => {
      throw error;
    });
};
