import React from 'react';
import { Link } from 'react-router-dom';


function Book(props) {

    const {cover, title, author} = props
    const { book, changeShelf, shelfID } = props

    function checkThumbnailExists(book) {
		if (cover) {
			return (
				<div className="book-cover" key={book.imageLinks.thumbnail} style={{ backgroundImage: `url(${book.imageLinks.thumbnail})`}} alt="book cover"></div>
			)
		} else {
            return ( 
                <div class="SRPCoverBlank" style="display: block;">
                    <div class="innerBorder">
                        <div class="BookTitle">{title} 
                        <div class="Author">{author}</div>
                        </div>
                    </div>
                </div>
            )
        }
	}
 

	return (
        <div className="book">
	        <div className="book-top">
	              { checkThumbnailExists(book) }
	            <div className="book-shelf-changer">
	                <select onChange={(event) => changeShelf(book, event.target.value)} defaultValue={book.shelf}>
	                  <option value="none" disabled>Move to...</option>
	                  <option value="currentlyReading">Currently Reading</option>
	                  <option value="wantToRead">Want to Read</option>
	                  <option value="read">Read</option>
	                  <option value="none">None</option>
	                </select>
	            </div>
	        </div>
	        <div className="book-title" key={book.title}>{book.title}</div>
	        <div className="book-authors" key={book.authors}>{book.authors && book.authors.join(', ')}</div>
        </div>
	);
};

export default Book;
