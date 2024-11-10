// src/components/StarRating.js
import React from 'react';

const StarRating = ({ rating }) => {
    const maxStars = 5;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = maxStars - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="star-rating">
            {[...Array(fullStars)].map((_, index) => (
                <i key={index} className="bi bi-star-fill text-warning"></i>
            ))}
            {halfStar && <i className="bi bi-star-half text-warning"></i>}
            {[...Array(emptyStars)].map((_, index) => (
                <i key={index} className="bi bi-star text-warning"></i>
            ))}
        </div>
    );
};

export default StarRating;
