export const matchSorter = ({ inputValue, deviceReadings }) =>
  deviceReadings.filter(reading =>
    new RegExp(inputValue, 'i').test(reading.name),
  );
