import React, { Component } from 'react';
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
      })
    }
  }

  render() {
    const placesListItems = this.state.places.map(place => <PlacesListItem key={place.id} place={place} />);

    return (
      <div>
        <h1>This is my PlacesList component.</h1>
        <p>And it's supposedly listing</p>
        <div  className='places-list'>
          {placesListItems}
        </div>
      </div>
    );
  }
}

export default PlacesList;
