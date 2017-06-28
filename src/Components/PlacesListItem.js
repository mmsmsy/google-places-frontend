import React, { Component } from 'react';
import $ from 'jquery';
import PlacePhoto from './PlacePhoto';

class PlacesListItem extends Component {
  getDistanceInKm = (lat1,lon1,lat2,lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2-lon1); 
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  }

  deg2rad = (deg) => {
    return deg * (Math.PI/180);
  }

  round = (value, decimals) => {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
  }

  lattitudeLongtitude = (coordinates) => {
    return coordinates.split(',');
  }

  render() {
    const place = this.props.place;

    let placePhoto;
    place.photos ?
    placePhoto = <PlacePhoto reference={place.photos[0].photo_reference} /> :
    placePhoto = <PlacePhoto />;

    let placeCoordinates = [];
    placeCoordinates.push(place.geometry.location.lat);
    placeCoordinates.push(place.geometry.location.lng);
    const searchCoordinates = this.props.currentLocation.split(',');

    let placeDistance = this.getDistanceInKm(placeCoordinates[0],placeCoordinates[1],searchCoordinates[0],searchCoordinates[1]);
    placeDistance = this.round(placeDistance, 2) + 'km'

    return (
      <div className='places-list-item'>
        <div 
          className='place-icon'
          onClick={() => {
            $(this.refs.info).slideToggle('fast');
          }}
        >
          <img className='place-icon-image' src={place.icon} alt='Place' title="Show place's types" />
        </div>
        <div className='place-info' ref='info'>
          <li className='place-info-item'>{place.vicinity}</li>
          <li className='place-info-item'>{place.rating} ☆ </li>
        </div>
        <p className='place-name' ref='name'>{place.name}</p>
        <div className='place-photo' ref='photo'>
          {placePhoto}
        </div>
        <div className='place-distance'>
          {placeDistance}
        </div>
      </div>
    );
  }
}

export default PlacesListItem