import React, { Component } from 'react';
import axios from 'axios';

class PlacePhoto extends Component {
  constructor() {
    super();
    this.state = {
      photoUrl: ''
    };
  }

  fetchPhoto = (reference, maxWidth) => {
    const url = 'api/v1/getphoto'
      + '?maxwidth=' + maxWidth
      + '&reference=' + reference;

    axios(url)
      .then(res => {
        this.setState({
          photoUrl: res.data
        });
      });
  }

  componentDidMount() {
    this.props.reference ?
    this.fetchPhoto(this.props.reference, this.props.maxWidth) :
    this.setState({photoUrl: 'https://shop.purgatoryresort.com/bundles/spotliowebappfront/purgatoryresort/images/photo_not_available.jpg'});
  }

  render() {
    return (
      <img className='place-photo-image' src={this.state.photoUrl} alt='Place' />
    );
  }
}

export default PlacePhoto