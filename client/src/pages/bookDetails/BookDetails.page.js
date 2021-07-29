import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import ListReviews from '../../components/Reviews/ListReviews';
import NewReview from '../../components/Reviews/NewReview';
import {mainSearch, searchOneWork} from '../../services/api.services'
import {allReviews} from '../../services/review.services'
const baseURL = `https://openlibrary.org`;


function BookDetails(props){

    const {bookId} = props.match.params
    const {user} = props
    const [bookState, setBookState] = useState({})
    const [reviewsState, setReviews] = useState([])


    useEffect(() => {
        searchOneWork(bookId).then(res => setBookState(res.data.docs[0]));
        allReviews(bookId).then(res => setReviews(res.data))
    }, [bookId])

    return (
            <div className="page-main">
                <h1>{bookState.title}</h1>
                <img src={bookState.coverUrl} alt="" />
                <a href={bookState.olLink}>Go to Open Library's page</a>
                <NewReview user={user} bookId={bookId} />
                
                {reviewsState.map(eachReview => {
                    return(
                        <div>
                        <h1>{eachReview.rating} stars</h1>
                        <p>{eachReview.comment}</p>
                        </div>
                    )
                })}

                
                
            </div>
        )
};

export default BookDetails;