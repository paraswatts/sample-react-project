import React, { useEffect, useState } from 'react';
import Rating from 'react-rating'
import './styles.scss';
export const StarRatingComponent = ({
    readonly,
    initialRating = 0,
    onStarChange = () => { }
}) => {



    return (
        <>
            <div className="star_rating rate_star">
                <Rating
                    fractions={1}
                    quiet={true}
                    initialRating={initialRating}
                    readonly={readonly}
                    emptySymbol={
                        <i className="fa fa-star unchecked"></i>
                    }
                    fullSymbol={
                        <i className="fa fa-star checked"></i>
                    }
                    // onClick={onClick}
                    onChange={onStarChange}
                />
            </div>
        </>
    );
}



