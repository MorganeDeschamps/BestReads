import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as bookshelfMethods from '../../services/bookshelves.services'
import CreatePrivateShelf from '../../components/PrivateShelves/NewDynamicShelf'

function PrivateBookShelf(props) {

    const { privateShelf } = props
    console.log(privateShelf)


    const [bookshelfState, setState] = useState({})

    useEffect(() => {
        setState(privateShelf)
    }, [])



/*     function moveBook() {
        bookshelfMethods()
    } */

    return (
   	 
         <div className="list-books">
          <div className="list-books-title">
            <h1>MyEbooks</h1>


            <h4>All Ebooks</h4>
             {bookshelfState.staticShelf && bookshelfState.staticShelf.map(eachBook => {
              return(
                <div key={eachBook._id}>
                  <img src={eachBook.coverUrl} alt="BookImg" />
                  <Link to={`/`}>{eachBook.title}</Link>
                  <div className="open-search">
                  <Link to="/ebook/create">Add an ebook</Link>
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


export default PrivateBookShelf;