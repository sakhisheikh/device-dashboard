import React, { Component } from 'react';
import { Polyline } from 'react-google-maps';

const lineCoordinatesStyling = {
  strokeColor: 'orange',
  strokeOpacity: 1,
  strokeWeight: 7,
};

class Polylines extends Component {
  state = {
    polylines: '',
  };

  componentWillReceiveProps(nextProps) {
    this.renderPolylines(nextProps);
  }

  renderPolylines = nextProps => {
    const { directions, lineCoordinates } = nextProps;

    const directionsPolyline =
      Object.keys(directions).length &&
      Object.keys(directions).map((key, i) => {
        return (
          <Polyline
            key={i}
            path={directions[key]}
            geodesic={false}
            options={directionsStyling}
          />
        );
      });

    const lineCoordinatesPolyline = lineCoordinates && (
      <Polyline
        key={'lineCoordinates'}
        path={lineCoordinates}
        geodesic={false}
        options={lineCoordinatesStyling}
      />
    );

    this.setState({
      polylines: [lineCoordinatesPolyline, directionsPolyline],
    });
  };

  render() {
    return this.props.children({
      polylines: this.state.polylines,
    });
  }
}

export default Polylines;
