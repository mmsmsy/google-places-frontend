import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';
import GoogleMap from 'google-map-react';
import { MapMarker } from './SharedModules.js';
import '../Styles/PlacesSearch.css';

class PlacesSearch extends Component {
  constructor() {
    super();
    this.state = {
      types: [],
      searchParams: {
        location: '',
        radius: null,
        type: '',
        keyword: ''
      },
      newPlaces: [],
      nextPageToken: '',
      onLoadResults: true
    }
  }

  static defaultProps = {
    types: ['','accounting','airport','amusement_park','aquarium','art_gallery','atm','bakery','bank','bar','beauty_salon','bicycle_store','book_store','bowling_alley','bus_station','cafe','campground','car_dealer','car_rental','car_repair','car_wash','casino','cemetery','church','city_hall','clothing_store','convenience_store','courthouse','dentist','department_store','doctor','electrician','electronics_store','embassy','fire_station','florist','funeral_home','furniture_store','gas_station','gym','hair_care','hardware_store','hindu_temple','home_goods_store','hospital','insurance_agency','jewelry_store','laundry','lawyer','library','liquor_store','local_government_office','locksmith','lodging','meal_delivery','meal_takeaway','mosque','movie_rental','movie_theater','moving_company','museum','night_club','painter','park','parking','pet_store','pharmacy','physiotherapist','plumber','police','post_office','real_estate_agency','restaurant','roofing_contractor','rv_park','school','shoe_store','shopping_mall','spa','stadium','storage','store','subway_station','synagogue','taxi_stand','train_station','transit_station','travel_agency','university','veterinary_care','zoo'],
    location: '30.042146,19.995291',
    radius: 50000,
    type: '',
    keyword: ''
  }

  componentWillMount() {
    this.getLocation();
    console.log(this.state.searchParams);
  }

  getLocation = () => {
    const key = 'AIzaSyCdigzTVpKkYy1W1bdBVTdaA-3p9CwqRSo';
    const url = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + key;
    axios.post(url)
      .then(res => {
        const location = res.data.location.lat + ',' + res.data.location.lng;
        const searchParams = this.state.searchParams;
        searchParams.location = location;
        this.setState({
          searchParams: searchParams
        }, () => {
          const radius = this.props.radius;
          const type = this.props.type;
          const keyword = this.props.keyword;
          const searchParams = this.state.searchParams;
          searchParams.radius = radius;
          searchParams.type = type;
          searchParams.keyword = keyword;

          this.setState({
            types: this.props.types,
            searchParams: searchParams
          }, () => {
            this.updatePlaces();
          });
        });
      })
  }

  buildQueryString = (loadMore) => {
    let queryString;
    const searchParams = this.state.searchParams;
    if (loadMore && this.state.nextPageToken) {
      queryString = 'api/v1/nextpage?nextPageToken=' + this.state.nextPageToken;
      return queryString;
    }
    else {
      queryString = 'api/v1/listplaces'
        + '?location=' + searchParams.location
        + '&radius=' + searchParams.radius
        + '&type=' + searchParams.type
        + '&keyword=' + searchParams.keyword;

      return queryString;
    }
  }

  updatePlaces = (loadMore = null) => {
    $('.places-list').fadeTo('slow', 0.3);
    if (!this.state.onLoadResults && !this.state.nextPageToken) {
      $('.loading').fadeTo(2000, 1);
      $('.places-list').fadeTo('slow', 1);
      return;
    }
    axios.get(this.buildQueryString(loadMore))
      .then(res => {
        this.setState({
          newPlaces: res.data.results,
          nextPageToken: res.data.nextPageToken,
          onLoadResults: false,
        }, () => {
          this.props.nextPlaces(this.state.newPlaces);
          this.props.updateLocation(this.state.searchParams.location);
          
          $('.places-list').fadeTo('slow', 1);
          $(window).on('scroll', this.handleScroll);
        });
      });
  }

  componentDidMount() {
    $(window).on('scroll', this.handleScroll);
  }

  handleSubmit = (event) => {
    $('.places-list').fadeTo('slow', 0.3);
    this.setState({
      searchParams: {
        location: this.state.searchParams.location,
        radius: this.props.radius,
        type: this.refs.type.value,
        keyword: this.refs.keyword.value
      }
    }, () => {
      axios.get(this.buildQueryString())
        .then(res => {
          this.setState({
            newPlaces: res.data.results,
            nextPageToken: res.data.nextPageToken,
            onLoadResults: true,
          }, () => {
            this.props.newSearch(this.state.newPlaces);
            this.props.updateLocation(this.state.searchParams.location);
            
            $('.places-list').fadeTo('slow', 1);
            $('.loading').fadeOut();
            $(window).on('scroll', this.handleScroll);
          });
        });
    });
    event.preventDefault();
  }

  handleScroll = () => {
    if($(window).scrollTop() + $(window).height() >= $(document).height()-100) {
      $(window).off('scroll', this.handleScroll);
      console.log('loading more');
      this.updatePlaces('Load more');
    }
  } 

  render() {
    if (!this.state.searchParams.location) return <p className="place-loading"> Loading ...</p>;
    const mapLocationArray = this.state.searchParams.location.split(',');
    const mapLocation = {};
    mapLocation.lat = parseFloat(mapLocationArray[0]);
    mapLocation.lng = parseFloat(mapLocationArray[1]);

    const typeOptions = this.state.types.map(type => {
      const typeDisplayed = type.replace(/_/g,' ');
      return <option key={type} value={type}>{typeDisplayed}</option>;
    });

    return (
      <div className='places-search'>
        <div className='google-map'>
          <GoogleMap
            bootstrapURLKeys={{
              key: "AIzaSyBZ5yFz157dCNy1484TLbab7_7iA6JqkXU"
            }}
            center={mapLocation}
            defaultZoom={11}
          >
            <MapMarker lat={mapLocation.lat} lng={mapLocation.lng} text='blablalba' />
          </GoogleMap>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type='text' ref='keyword' placeholder="Type in what You're looking for"></input>
          </label>
          <label>
            Category
            <select ref='type'>
              {typeOptions}
            </select>
          </label>
          <input type='submit' value='Search'></input>
        </form>
      </div>
    );
  }
}

export default PlacesSearch


