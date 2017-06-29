import React, { Component } from 'react';
import StarIcon from 'react-icons/lib/md/star';
import StarHalfIcon from 'react-icons/lib/md/star-half';
import StarOutlineIcon from 'react-icons/lib/md/star-outline';

class StarRating extends Component {
  render() {
    if (!this.props.rating) return <div>No rating</div>;

    let ratingArray = [];
    let i = 1;
    const rating = this.props.rating;

    for (i; i <= rating; i += 0.5) {
      !(i % 1) ?
      ratingArray.splice(-1,1,1) :
      ratingArray.push(0.5);
    }
    for (i; i < 5; i++) {
      ratingArray.push(0);
    }
    const endResult = ratingArray.map((star, index) => {
      let endStar;

      if (star === 1) endStar = <StarIcon className='icon' key={index} />;
      else if (star === 0.5) endStar = <StarHalfIcon className='icon' key={index} />;
      else if (star === 0) endStar = <StarOutlineIcon className='icon' key={index} />;

      return endStar;
    });

    return (
      <span className='star-rating'>{rating} {endResult}</span>
    );
  }
}

export { StarRating }