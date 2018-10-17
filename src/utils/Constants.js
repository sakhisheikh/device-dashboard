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
  strokeColor: 'orange',
  strokeOpacity: 1,
  strokeWeight: 7,
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
