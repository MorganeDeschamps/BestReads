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




    function filter(book) {
      let result = {
          author: book.author_name,
          title: book.title,
          _id: book.key.replace("/works/", ""),
          olLink: `https://openlibrary.org${book.key}`
      }

      if (book.cover_edition_key) result.coverUrl = `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`;

      //console.log("result: ", result)
      return result 

    }



    useEffect(() => {
        searchOneWork(bookId).then(res => setBookState(filter(res.data.docs[0])));
        allReviews(bookId).then(res => setReviews(res.data))
    }, [bookId])

    return (
            <div className="page-main">
                <h1>{bookState.title}</h1>
                <img src={bookState.coverUrl} alt="" />
                <a href={bookState.olLink} target="blank" >Go to Open Library's page</a>
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