import React, { Component } from 'react';
import axios from 'axios';
import '../Styles/PlacesSearch.css';

class PlacesSearch extends Component {
  constructor() {
    super();
    this.state = {
      types: ['accounting','airport','amusement_park','aquarium','art_gallery','atm','bakery','bank','bar','beauty_salon','bicycle_store','book_store','bowling_alley','bus_station','cafe','campground','car_dealer','car_rental','car_repair','car_wash','casino','cemetery','church','city_hall','clothing_store','convenience_store','courthouse','dentist','department_store','doctor','electrician','electronics_store','embassy','fire_station','florist','funeral_home','furniture_store','gas_station','gym','hair_care','hardware_store','hindu_temple','home_goods_store','hospital','insurance_agency','jewelry_store','laundry','lawyer','library','liquor_store','local_government_office','locksmith','lodging','meal_delivery','meal_takeaway','mosque','movie_rental','movie_theater','moving_company','museum','night_club','painter','park','parking','pet_store','pharmacy','physiotherapist','plumber','police','post_office','real_estate_agency','restaurant','roofing_contractor','rv_park','school','shoe_store','shopping_mall','spa','stadium','storage','store','subway_station','synagogue','taxi_stand','train_station','transit_station','travel_agency','university','veterinary_care','zoo'],
      searchParams: {
        location: '',
        radius: null,
        type: '',
        keyword: ''
      },
      newPlaces: [],
      nextPageToken: ''
    }
  }

  static defaultProps = {
    location: '-33.8670522,151.1957362',
    radius: 50000,
    type: '',
    keyword: ''
  }

  componentWillMount() {
    this.setState({
      searchParams: {
        location: this.props.location,
        radius: this.props.radius,
        type: this.props.type,
        keyword: this.props.keyword
      }
      
    });
  }

  buildQueryString = (loadMore) => {
    let queryString;
    const searchParams = this.state.searchParams;
    if (loadMore) {
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
    axios.get(this.buildQueryString(loadMore))
      .then(res => {
        this.setState({
          newPlaces: res.data.results,
          nextPageToken: res.data.nextPageToken
        }, () => {
          this.props.nextPlaces(this.state.newPlaces);
        });
      });
  }

  componentDidMount() {
    this.updatePlaces();
  }

  handleSubmit = (event) => {
    if (this.refs.keyword.value === '' || this.refs.distance.value === '') alert ('All fields are required.');
    else {
      this.setState({
        searchParams: {
          radius: this.refs.distance.value,
          type: this.refs.type.value,
          keyword: this.refs.keyword.value
        }
      })
    }
    event.preventDefault();
  }

  render() {
    const typeOptions = this.state.types.map(type => {
      const typeDisplayed = type.replace(/_/g,' ');
      return <option key={type} value={type}>{typeDisplayed}</option>;
    });

    return (
      <div>
        <h1>This is my PlacesSearch component.</h1>
        <p>And it's supposedly searching</p>
        <button onClick={() => this.updatePlaces('Load more')}>Load more</button>
        <form onSubmit={this.handleSubmit}>
          <label>
            Keyword
            <input type='text' ref='keyword'></input>
          </label>
          <label>
            Type
            <select ref='type'>
              {typeOptions}
            </select>
          </label>
          <label>
            Distance
            <input type='number' max='50000' ref='distance'></input>
          </label>
          <input type='submit' value='Submit'></input>
        </form>
      </div>
    );
  }
}

export default PlacesSearch


