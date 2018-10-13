/* eslint-disable */
import React, { Component } from 'react';
import Map from './Map';

class MapLayout extends Component {

  render() {

    return (

      // <Directions
      //   pickUpCoords={activeJourney.pickUpCoords}
      //   dropOffCoords={activeJourney.dropOffCoords}
      //   originCoords={activeJourney.originCoords}
      //   destinationCoords={activeJourney.destinationCoords}
      //   onDirectionsReady={this.onHandleDirectionsReady}
      // >
      //   {(({ directions }) => (
      <Map
        containerElement={<div style={{ height: '500px', width: '100%', borderRadius: '8px' }} />}
        mapElement={<div style={{ height: `100%`, borderRadius: '8px' }} />}
      />
      // </Directions>
    );

  }
}

export default MapLayout;
