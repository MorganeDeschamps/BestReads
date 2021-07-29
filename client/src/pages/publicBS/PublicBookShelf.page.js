import React, { useEffect, useState } from 'react'
import "../../App.css"
import BookEbook from '../../components/Book/BookEbook'
import { movePublic } from '../../services/shelves.services'

import { getLoggedIn, logout } from "../../services/auth"

import * as CONSTS from '../../utils/consts';

function PublicBookShelf(props) {
  const {user, setUser} = props;
  const { publicShelf } = props

  const [bookshelfState, setState] = useState(publicShelf)

  useEffect(() => {
      setState(publicShelf)
  }, [publicShelf])
    
  const initalState = {username: '', publicBookshelf: {}, privateBookshelf: {}, reviews: []}

  /* const username = user.username
  const publicBookshelf = user.publicBookshelf
  const privateBookshelf = user.privateBookshelf
  const reviews = user.reviews */
  const [username, setUsername] = useState(user.username)
  const [publicBookshelf, setPublicBookshelf] = useState(user.publicBookshelf)
  const [privateBookshelf, setPrivateBookshelf] = useState(user.privateBookshelf)
  const [reviews, setReviews] = useState(user.reviews)
  const [publicShelves, setPublicBS] = useState()
  const [privateShelves, setPrivateBS] = useState()


  useEffect(() => {
      updateUser()
  }, [])

  function updateUser() {
      const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
  if (!accessToken) {
  }
  getLoggedIn(accessToken).then((res) => {
    if (!res.data) {
      console.log('RES IN CASE OF FAILURE', res);
    } else {
      //setUser(res.data.user)
              setPrivateBookshelf(res.data.user.privateBookshelf)
              setPublicBookshelf(res.data.user.publicBookshelf)
              setPublicBS(res.data.user.publicBookshelf.shelves)
              setPrivateBS(res.data.user.privateBookshelf.shelves)
    }
  });
  }

    return (
   	 

         <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
              {bookshelfState && bookshelfState.shelves && bookshelfState.shelves.length > 0 && bookshelfState.shelves.map(shelf => {
              return(
                <div key={shelf._id} className="bookshelf">
                  <h3>{shelf.name}</h3>
	                <div className="bookshelf-books">
	                  <ol className="books-grid">
                      {shelf.books && shelf.books.map(eachBook => 
                          <BookEbook book={eachBook} user={props.user} bsType="public" updateUser={updateUser} bookshelf={publicShelf} shelf={shelf._id} />
                      )}
                    </ol>
                  </div>
                </div>  
              )
            })}



{/* 


            <h4>Currently Reading</h4>
             {bookshelfState.currentlyReading && bookshelfState.currentlyReading.map(eachBook => {
              return(
                <div key={eachBook._id}>
                  <img src={eachBook.coverUrl} alt="BookImg" />
                  <Link to={`/details/${eachBook._id}`}>{eachBook.title}</Link>
                  <a href={eachBook.olLink} target="_blank" rel="noreferrer">Go to Open Library</a>
                  <div className="open-search">
                  <Link to="/search">Add a book</Link>
                  </div>
                </div>
              )
            })}
            <h4>Want to Read</h4>
              {bookshelfState.wantToRead && bookshelfState.wantToRead.map(eachBook => {
              return(
                <div key={eachBook._id}>
                  <img src={eachBook.coverUrl} alt="BookImg" />
                  <Link to={`/details/${eachBook._id}`}>{eachBook.title}</Link>
                  <a href={eachBook.olLink} target="_blank" rel="noreferrer">Go to Open Library</a>
                  <div className="open-search">
                  <Link to="/search">Add a book</Link>
                  </div>
                </div>
              )
            })}
            <h4>Read</h4>
            {bookshelfState.read && bookshelfState.read.map(eachBook => {
              return(
                <div key={eachBook._id}>
                  <img src={eachBook.coverUrl} alt="BookImg" />
                  <Link to={`/`}>{eachBook.title}</Link>
                  {/* option to review, drop down review 
                  <div className="open-search">
                  <Link to="/search">Add a book</Link>
                  </div>
                </div>
              )
            })}

            {bookshelfState.dynamicShelves && bookshelfState.dynamicShelves.length > 0 && bookshelfState.dynamicShelves.map(shelf => {
              return(
                <div key={shelf._id}>
                  <h3>{shelf.name}</h3>
                  {shelf.books && shelf.books.map(eachBook => {
                  return(
                    <div key={eachBook._id}>
                      <img src={eachBook.coverUrl} alt="BookImg" />
                      <Link to={`/details/${eachBook._id}`}>{eachBook.title}</Link>
                      <a href={eachBook.olLink} target="_blank" rel="noreferrer">Go to Open Library</a>
                    </div>
                )
            })}
                </div>
              )
            })}

 */}
         {/*    <button className = "info-button" onClick = {showForm}>Add a new shelf</button> */}

          </div>

        </div>

     )

}


export default PublicBookShelf;

