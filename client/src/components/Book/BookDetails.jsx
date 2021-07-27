
// get details by book id and display

import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import {getOneBook} from '../../services/api.services'
import NewReview from '../../components/Reviews/Review'


function BookDetails(props){
    const {olib} = props;
    
    const [userBookshelfState, setUserBookshelfState] = useState({})


    useEffect(()=>{
        getOneBook(olib)
        .then ((book)=> setUserBookshelfState(book.data))
        
        .catch(err => console.log(err))
    }, []);
       return (
            <div>
                <h2>Book details</h2>
                <h4>userBookshelfState</h4>
                <NewReview privateShelf= {userBookshelfState.privateBookshelf}/>



      {/*           create logic for private shelves and logic for public shelves and call in here 
      pass public and private bookshelves as props*/}

                </div>
                )
};

export default BookDetails;