import React, { Component } from 'react';
import PlacesSearch from './PlacesSearch';
import PlacesList from './PlacesList';

class PlacesApp extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    }
  }

  handleNextPlaces = (newPlaces) => {
    let places = this.state.places;
    places = places.concat(newPlaces);
    this.setState({places: places});
  }

  render() {
    return (
      <div>
        <h1>Main PlacesApp Component</h1>
        <PlacesSearch nextPlaces={this.handleNextPlaces} />
        <PlacesList places={this.state.places} />
      </div>
    );
  }
}

export default PlacesApp