import React from 'react';

const ReadingsContext = React.createContext({
  handleStats: () => { },
  isReadingsDialog: false,
});

export default ReadingsContext;
