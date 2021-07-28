import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as bookshelfMethods from '../../services/bookshelves.services'
import CreatePrivateShelf from '../../components/PrivateShelves/NewDynamicShelf'

function PrivateBookShelf(props) {

    const { privateShelf } = props


    const [bookshelfState, setState] = useState(privateShelf)

    useEffect(() => {
        setState(privateShelf)
    }, [privateShelf])


    return (
   	 
         <div className="list-books">
          <div className="list-books-title">
            <h1>MyEbooks</h1>


            <h4>All Ebooks</h4>
            <Link to="/ebook/create">Add an ebook</Link>
             {bookshelfState.staticShelf && bookshelfState.staticShelf.map(eachBook => {
               console.log('this is the current book', eachBook)
              return(
                <div key={eachBook._id}>
                  <img src={eachBook.coverUrl} alt="BookImg" />
                  <h2>{eachBook.title}</h2>
                  <Link to={`/`}>{eachBook.title}</Link>
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
                    </div>
                )
            })}
                </div>
              )
            })}

          </div>

        </div>

     )

}


export default PrivateBookShelf;