import React, { Component } from 'react';

class PlaceType extends Component {
  render() {
    const type = this.props.type;
    const typeDisplayed = type.replace(/_/g,' ');

    return (
      <li className='place-type-item'>{typeDisplayed}</li>
    );
  }
}

export default PlaceType