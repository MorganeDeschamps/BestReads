import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as bookshelfMethods from '../../services/bookshelves.services'
import CreatePrivateShelf from '../../components/PrivateShelves/NewDynamicShelf'

function PrivateBookShelf(props) {

    const { privateShelf } = props
    console.log('this is what we get through props', privateShelf)


    const [bookshelfState, setState] = useState(privateShelf)

    useEffect(() => {
        setState(privateShelf)
        console.log('this is the current bookshelf state', bookshelfState)
    }, [privateShelf])


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
              {bookshelfState.dynamicShelves && bookshelfState.dynamicShelves.length > 0 && bookshelfState.dynamicShelves.map(shelf => {
              return(
                <div key={shelf._id}>
                  <h3>{shelf.name}</h3>
                  {shelf.ebooks && shelf.ebooks.map(eachBook => {
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