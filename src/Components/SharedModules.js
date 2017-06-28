import React, { Component } from 'react';
import Star from 'react-icons/lib/md/star';
import StarHalf from 'react-icons/lib/md/star-half';
import StarOutline from 'react-icons/lib/md/star-outline';

class StarRating extends Component {
  render() {
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

      if (star === 1) endStar = <Star key={index} />;
      else if (star === 0.5) endStar = <StarHalf key={index} />;
      else if (star === 0) endStar = <StarOutline key={index} />;

      return endStar;
    });

    return (
      <span>{rating} {endResult}</span>
    );
  }
}

export { StarRating }