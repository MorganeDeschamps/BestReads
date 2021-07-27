import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as bookshelfMethods from '../../services/bookshelves.services'

function PublicBookShelf(props) {

    const { publicShelf } = props
    console.log(publicShelf)


    const [bookshelfState, setState] = useState({})

    useEffect(() => {
        setState(publicShelf)
    }, [])

    // map through book arrays that are there and show what is inside, give the option to add books and search

/*     function moveBook() {
        bookshelfMethods()
    } */

    return (
   	 
         <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>


            <h4>Currently Reading</h4>
             {bookshelfState.currentlyReading && bookshelfState.currentlyReading.map(eachBook => {
              return(
                <div key={eachBook._id}>
                  <img src={eachBook.coverUrl} alt="BookImg" />
                  
                  <Link to={`/`}>{eachBook.title}</Link>
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
                  <Link to={`/`}>{eachBook.title}</Link>
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
                  {/* option to review, drop down review */}
                  <div className="open-search">
                  <Link to="/search">Add a book</Link>
                  </div>
                </div>
              )
            })}
         {/*    <button className = "info-button" onClick = {showForm}>Add a new shelf</button> */}

          </div>

{/*         <div className="list-books-content">
            <div>
              <CurrentlyReading changeShelf={changeShelf} books={books} />
            </div>
            <div>
              <WantToRead changeShelf={changeShelf} books={books} />
            </div>
            <div>
              <Read changeShelf={changeShelf} books={books} />
            </div>

          </div> */}

        </div>

     )

}


export default PublicBookShelf;

