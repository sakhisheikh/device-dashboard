export const labelStyling = {
  clear: 'both',
  display: 'inline-block',
  backgroundColor: '#4e6a87',
  fontWeight: '700',
  color: '#FFFFFF',
  boxShadow: '0 6px 8px 0 rgba(63,63,63,0.11)',
  borderRadius: '30px',
  padding: '6px 16px',
  whiteSpace: 'nowrap',
  width: '120px',
  textAlign: 'center',
};

export const lineCoordinatesStyling = {
  strokeColor: '#00C49F',
  strokeOpacity: 1,
  strokeWeight: 7,
};

export const CHART_DATA = {
  circle: active => {
    const chartData = [
      { name: 'score', value: 100, fill: active ? '#00C49F' : 'grey' },
    ];
    return chartData;
  },
  degree: value => {
    const max = 360 - Math.abs(value);
    const chartData = [
      { name: 'score', value: Math.abs(value), fill: '#00C49F' },
      { name: 'max', value: max, max: '#eee' },
    ];
    return chartData;
  },
};

export const initializeMap = () => {
  const head = document.getElementsByTagName('head')[0];

  // Save the original method
  const insertBefore = head.insertBefore;

  // Replace it!
  head.insertBefore = (newElement, referenceElement) => {
    if (
      newElement.href &&
      newElement.href.indexOf(
        'https://fonts.googleapis.com/css?family=Roboto',
      ) === 0
    ) {
      return;
    }

    insertBefore.call(head, newElement, referenceElement);
  };
};

export const darkMapStyles = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    elementType: 'labels.icon',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#212121',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'administrative.country',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#9e9e9e',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#bdbdbd',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [
      {
        color: '#181818',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#1b1b1b',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#2c2c2c',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8a8a8a',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#373737',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#3c3c3c',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#4e4e4e',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#616161',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#757575',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        color: '#000000',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#3d3d3d',
      },
    ],
  },
];
