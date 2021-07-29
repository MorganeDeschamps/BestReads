
// get details by book id and display

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {getOneBook} from '../../services/api.services'
import NewReview from '../Reviews/NewReview'
import {allReviews} from '../../services/review.services'


function BookDetails(props){
    const {olid} = props; //? is this the user that I am actually getting through props
    // not getting the correct data 
    
    const [bookState, setBookState] = useState({})
    const [reviewState, setReviewState] = useState([])


    useEffect(()=>{
        getOneBook(olid)
        .then ((book)=> console.log('This is coming through the use effect', book.data))//setBookState(book.data))
    
        .then (() => allReviews(olid)
        .then(dbReviews => setReviewState(dbReviews)))
        
        .catch(err => console.log(err))
    }, []);

    // map the array of reviews 
    // same as creating a bookshelf, update the state in here

       return (
            <div className="single-book">
                <h2>Book details</h2>
                <h4>{bookState.title}</h4>
                <h6>{bookState.author}</h6>
                <img src={bookState.coverUrl} alt="BookImg" />
                <Link to='/ol link should be here'></Link>
                <NewReview book= {olid}/>
                <h4>All Reviews:</h4>
                <div>
                    {reviewState.comment && reviewState.comment.map(eachComment => {
                        console.log('this is the current comment', eachComment)
                        return(
                        <div key={eachComment._id}>
                            <h2>{eachComment.owner}</h2>
                            <p>{eachComment.comment}</p>
                            <Link to={`/`}>{eachComment.comment}</Link>
                        </div>
                        )
                    })}

                </div>
        
            </div>
        )
};

export default BookDetails;