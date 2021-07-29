import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import NewReview from '../../components/Reviews/NewReview';
import {allReviews} from '../../services/review.services'
const baseURL = `https://openlibrary.org`;


function ListReviews(props){

    //const {bookId} = props

    const {bookId} = props.match.params
    console.log("reviews bookid", bookId)

    function getReviews(bookId) {
        allReviews(bookId).then(res => console.log("reviews: ", res))
    }


    return (
            <div className="page-main">
               {/*  {reviews.map(review => <p>{review.comment}</p>)} */}
            </div>
        )
};

export default ListReviews;