import React, { Component } from 'react';
import axios from 'axios';
import PlacePhoto from './PlacePhoto';
import { StarRating, MapMarker } from './SharedModules.js';
import PhoneIcon from 'react-icons/lib/md/local-phone';
import WebsiteIcon from 'react-icons/lib/md/language';
import LocationIcon from 'react-icons/lib/md/location-on';
import NotAvailableIcon from 'react-icons/lib/md/not-interested';
import GoogleMap from 'google-map-react';
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
    if (this.state.loading || !this.state.place) return <p className="place-loading"> Loading ...</p>;

    const place = this.state.place;
    let placePhoto;
    place.photos ?
    placePhoto = <PlacePhoto reference={place.photos[0].photo_reference} maxWidth='1280'/> :
    placePhoto = <PlacePhoto />;

    let placeTypes = place.types.map(type => {
      const typeToDisplay = type.replace(/_/g, " ");
      return <li key={type}>{typeToDisplay}</li>
    });

    if (!place.formatted_phone_number) {
      return (
        <div className='place-details'>
          <div className='place-details-info'>
            {placePhoto}
            <div className='place-details-info-data'>
              <div className='place-details-category'>
                <img src={place.icon} alt={place.icon} />
                <ul>{placeTypes}</ul>
              </div>
              <h2>{place.name}</h2>
            </div>
          </div>
          <div className='google-map'>
            <GoogleMap
              bootstrapURLKeys={{
                key: "AIzaSyBZ5yFz157dCNy1484TLbab7_7iA6JqkXU"
              }}
              center={place.geometry.location}
              defaultZoom={13}
            >
              <MapMarker lat={place.geometry.location.lat} lng={place.geometry.location.lng} />
            </GoogleMap>
          </div>
        </div>
      );
    }

    const openNow = place.opening_hours ?
    (place.opening_hours.open_now ? 'Yes' : 'No') :
    'Unknown';
    
    let phoneLink;
    if (place.formatted_phone_number) {
      const phoneNumberHref = 'tel:'
      + place.formatted_phone_number
        .split(' ')
        .join('');

      phoneLink = <a href={phoneNumberHref}><PhoneIcon className='icon' /><br />call</a>;
    }
    else phoneLink = <span><p>No phone number available</p></span>;

    let websiteLink;
    if (place.website) websiteLink = <a href={place.website}><WebsiteIcon className='icon' /><br />website</a>;
    else websiteLink = <a href='https://www.google.com'><NotAvailableIcon className='icon' /><br />website not available</a>

    const mapHref = 'http://maps.google.com/?q=' + place.formatted_address;

    return (
      <div className='place-details'>
        <div className='place-details-info'>
          {placePhoto}
          <div className='place-details-info-data'>
            <div className='place-details-category'>
              <span><img src={place.icon} alt={place.icon} /></span>
              <ul>{placeTypes}</ul>
            </div>
            <h2>{place.name}</h2>
            <p>{place.formatted_address}</p>
            <p><StarRating rating={place.rating} /> | <strong>Open now:</strong> {openNow}</p>
            <div className='place-details-link'>
              {phoneLink}
              {websiteLink}
             <a href={mapHref}><LocationIcon className='icon' /><br />navigate</a>
            </div>
          </div>
        </div>
        <div className='google-map'>
          <GoogleMap 
            bootstrapURLKeys={{
              key: "AIzaSyBZ5yFz157dCNy1484TLbab7_7iA6JqkXU"
            }}
            center={place.geometry.location}
            defaultZoom={13}
          >
            <MapMarker lat={place.geometry.location.lat} lng={place.geometry.location.lng} />
          </GoogleMap>
        </div>
      </div>
    );
  }
}

export default PlaceDetails