import React, { Component } from 'react';
import $ from 'jquery';
import jqueryui from 'jquery-ui'
import PlaceType from './PlaceType';
import PlacePhoto from './PlacePhoto';

class PlacesListItem extends Component {
  render() {
    const place = this.props.place;
    const types = place.types.map(type => <PlaceType type={type} key={type} />);

    let placePhoto;
    place.photos ?
    placePhoto = <PlacePhoto reference={place.photos[0].photo_reference} /> :
    placePhoto = <PlacePhoto />;

    return (
      <div className='places-list-item'>
        <div 
          className='place-icon'
          onClick={() => {
            $(this.refs.types).slideToggle('fast');
          }}
        >
          <img className='place-icon-image' src={place.icon} alt='Place' title="Show place's types" />
        </div>
        <div className='place-type' ref='types'>
          {types}
        </div>
        <p className='place-name' ref='name'>{place.name}</p>
        <div className='place-photo' ref='photo'>
          {placePhoto}
        </div>
      </div>
    );
  }
}

export default PlacesListItem