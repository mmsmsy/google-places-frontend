import React, { Component } from 'react';
import axios from 'axios';
import PlacePhoto from './PlacePhoto';
import { StarRating } from './SharedModules.js';
import '../Styles/PlaceDetails.css';

class PlaceDetails extends Component {
  constructor() {
    super();
    this.state = {
      place: null,
      loading: false
    }
  }

  componentDidMount() {
    this.setState({
      loading: true
    });
    axios.get(`/api/v1/placedetails/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          place: res.data,
          loading: false
        });
      });
  }

  render() {
    console.log(this.state.place);
    if (this.state.loading || !this.state.place) {
      return (
        <p className="place-loading"> Loading ...</p>
      );
    }

    const place = this.state.place;
    let placePhoto;
    place.photos ?
    placePhoto = <PlacePhoto reference={place.photos[0].photo_reference} maxWidth='1280'/> :
    placePhoto = <PlacePhoto />;

    return (
      <div className='place-details'>
        <div className='place-details-info'>
          {placePhoto}
          <div className='place-details-info-data'>
            <h2>{place.name}</h2>
            <p><StarRating rating={place.rating} /></p>
          </div>
        </div>
      </div>
    );
  }
}

export default PlaceDetails