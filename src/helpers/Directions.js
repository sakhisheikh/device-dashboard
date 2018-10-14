import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Directions extends Component {
  state = {
    latitude: '',
    longitude: '',
    directions: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.latitude !== prevState.latitude &&
      nextProps.longitude !== prevState.longitude
    ) {
      return {
        latitude: nextProps.latitude,
        longitude: nextProps.longitude,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { latitude, longitude } = this.props;
    if (prevProps.latitude !== latitude && prevProps.longitude !== longitude) {
      this.onInitializeDirections();
    }
  }

  onInitializeDirections = () => {
    const { latitude, longitude } = this.state;

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(52.511991, 13.383959),
        destination: new google.maps.LatLng(latitude, longitude),
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const overViewCoords = result.routes[0].overview_path;
          this.setState({
            directions: overViewCoords,
          });
        } else {
          console.warn(`error fetching directions ${status}`);
        }
      },
    );
  };

  render() {
    const { directions } = this.state;
    const { children } = this.props;
    return children({
      directions,
    });
  }
}

Directions.propTypes = {
  children: PropTypes.any,
  latitude: PropTypes.any,
  longitude: PropTypes.any,
};

export default Directions;
