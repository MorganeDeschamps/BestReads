import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreatePrivateShelf from '../../components/PrivateShelves/NewDynamicShelf'
import BookEbook from '../../components/Book/BookEbook'
import { movePrivate } from '../../services/shelves.services'

function PrivateBookShelf(props) {

    const { privateShelf } = props
    const {updateUser} = props


    const [bookshelfState, setState] = useState(privateShelf)

    useEffect(() => {
        setState(privateShelf)
    }, [privateShelf])


    return (
   	 
         <div className="list-books">
          <div className="list-books-title">
            <h1>MyEbooks</h1>
            <Link to="/ebook/create">Add an ebook</Link>
              {bookshelfState.shelves && bookshelfState.shelves.length > 0 && bookshelfState.shelves.map(shelf => {
              return(
                <div key={shelf._id} className="bookshelf">
                  <h3>{shelf.name}</h3>
	                <div className="bookshelf-books">
	                  <ol className="books-grid">
                      {shelf.ebooks && shelf.ebooks.map(eachBook => 
                          <BookEbook book={eachBook} user={props.user} bsType="private" bookshelf={privateShelf} shelf={shelf._id} updateUser={updateUser} />
                      )}
                    </ol>
                  </div>
                </div>  
              )
            })}

          </div>

        </div>

     )

}


export default PrivateBookShelf;