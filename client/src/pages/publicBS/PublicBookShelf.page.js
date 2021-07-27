import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CurrentlyReading from "../Components/PublicShelves/CurrentlyReading"
import WantToRead from '../Components/PublicShelves/WantToRead'
import Read from '../Components/PublicShelves/Read'


import * as bookshelfMethods from '../Services/bookshelves.services'

export default function PublicBookShelf(props) {

    const { bookshelfId } = props

    const [bookshelfState, setState] = useState({})

    useEffect(() => {
        bookshelfMethods.getPublicBookshelf(bookshelfId)
        .then(bookshelf => setState(bookshelf))
        .catch(err => console.log(err))
    })

    // map through book arrays that are there and show what is inside, give the option to add books and search

    function moveBook() {
        bookshelfMethods()
    }


    return (
   	 
         <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>

          <div className="list-books-content">
            <div>
              <CurrentlyReading changeShelf={changeShelf} books={books} />
            </div>
            <div>
              <WantToRead changeShelf={changeShelf} books={books} />
            </div>
            <div>
              <Read changeShelf={changeShelf} books={books} />
            </div>

          </div>

          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>

        </div>

     )

}

