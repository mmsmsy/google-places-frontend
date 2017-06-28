import React, { Component } from 'react';
import $ from 'jquery';
import PlacesListItem from './PlacesListItem';
import '../Styles/PlacesList.css';

class PlacesList extends Component {
  constructor() {
    super();
    this.state = {
      places: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(this.props.places) !== JSON.stringify(nextProps.places)) {
      this.setState({
        places: nextProps.places
      });
    }
  }

  render() {
    const placesListItems = this.state.places.map(place => <PlacesListItem key={place.id} place={place} currentLocation={this.props.currentLocation} />);

    return (
      <div>
        <div  className='places-list'>
          {placesListItems}
        </div>
        <div className='loading'>
          <h1>No more results available</h1>
        </div>
      </div>
    );
  }
}

export default PlacesList;
