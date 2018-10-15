import React from 'react';

const MapContext = React.createContext({
  directions: '',
  getDirections: () => { },
});

export default MapContext;
