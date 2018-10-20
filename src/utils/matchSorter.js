/* eslint-disable*/
export const MatchSorter = ({ inputValue, readings }) =>
  readings.filter(reading => new RegExp(inputValue, 'i').test(reading.name));
