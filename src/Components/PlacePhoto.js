import React, { Component } from 'react';
import axios from 'axios';

class PlacePhoto extends Component {
  constructor() {
    super();
    this.state = {
      photoUrl: ''
    };
  }

  fetchPhoto = (reference) => {
    axios(`api/v1/getphoto/${reference}`)
      .then(res => {
        this.setState({
          photoUrl: res.data
        });
      });
  }

  componentDidMount() {
    this.props.reference ?
    this.fetchPhoto(this.props.reference) :
    this.setState({photoUrl: 'https://shop.purgatoryresort.com/bundles/spotliowebappfront/purgatoryresort/images/photo_not_available.jpg'});
  }

  render() {
    return (
      <img className='place-photo-image' src={this.state.photoUrl} alt='Place' />
    );
  }
}

export default PlacePhoto