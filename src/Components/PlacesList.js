import React, { Component } from 'react';
import axios from 'axios';
import PlacesListItem from './PlacesListItem';
import '../Styles/PlacesList.css';

class PlacesList extends Component {
  constructor() {
    super();
    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    axios('api/v1/listplaces')
      .then(places => {
        this.setState({
          places: places.data
        });
      });
  }

  render() {
    const placesListItems = this.state.places.map(place => <PlacesListItem key={place.id} place={place} />);

    return (
      <div>
        <h1>This is my PlacesList component.</h1>
        <p>And it's supposedly working</p>
        <div  className='places-list'>
          {placesListItems}
        </div>
      </div>
    );
  }
}

export default PlacesList;
