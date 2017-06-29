import React, { Component } from 'react';
import PlacesSearch from './PlacesSearch';
import PlacesList from './PlacesList';
import '../Styles/PlacesApp.css';

class PlacesApp extends Component {
  constructor() {
    super();
    this.state = {
      places: [],
      currentLocation: ''
    }
  }

  handleNextPlaces = (newPlaces) => {
    let places = this.state.places;
    places = places.concat(newPlaces);
    this.setState({places: places});
  }

  handleNewSearch = (newPlaces) => {
    this.setState({places: newPlaces})
  }

  handleUpdateLocation = (newLocation) => {
    this.setState({currentLocation: newLocation});
  }

  render() {
    return (
      <div className='places-app'>
        <PlacesSearch
          nextPlaces={this.handleNextPlaces}
          newSearch={this.handleNewSearch}
          updateLocation={this.handleUpdateLocation}
        />
        <PlacesList
          places={this.state.places}
          currentLocation={this.state.currentLocation}
        />
      </div>
    );
  }
}

export default PlacesApp