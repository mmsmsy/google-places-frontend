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
    console.log(this.props.places);
    const placesListItems = this.state.places.map(place => <PlacesListItem key={place.id} place={place} currentLocation={this.props.currentLocation} />);

    return (
      <div>
        <div  className='places-list'>
          {placesListItems}
        </div>
      </div>
    );
  }
}

export default PlacesList;
