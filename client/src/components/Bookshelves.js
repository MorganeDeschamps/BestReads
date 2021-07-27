import React from 'react'
import './App.css'
import Book from "./Book/Book"

function Bookshelf(props) {


    // destructuring props so can be called without 'this.props'
    const { books, changeShelf, shelfName } = props
    let shelfID = props.shelfID
    if(!shelfID) shelfID = shelfName



    return (


		<div className="bookshelf">
	      <h2 className="bookshelf-title">{shelfName}</h2>
	      <div className="bookshelf-books">
	        <ol className="books-grid">

		        {/* must bind changeShelf func for it to be passed as a prop to Book.js */}
		        {books.map((book) => 
		        	<Book key={book} book={book} changeShelf={changeShelf} shelfID={shelfID} />
		        )}
		        
	        </ol>
	      </div>
	    </div>

	)
}

export default Bookshelf