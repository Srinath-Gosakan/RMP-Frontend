import React from 'react';
import ReactRating from 'react-rating';
import './StarRating.css';

const StarRating = ({ rating, setRating, interactive = false }) => {
  const starStyle = {
    fontSize: '28px',
    marginRight: '4px',
  };

  return (
    <div className="star-rating-wrapper">
      <ReactRating
        initialRating={rating}
        readonly={!interactive}
        fractions={2} // allows 0.5 ratings
        onChange={(value) => interactive && setRating(value)}
        emptySymbol={<span className="star empty" style={starStyle}>☆</span>}
        fullSymbol={<span className="star full" style={starStyle}>★</span>}
        placeholderSymbol={<span className="star full" style={starStyle}>★</span>}
      />
      <span className="rating-display">{rating.toFixed(1)} / 5</span>
    </div>
  );
};

export default StarRating;