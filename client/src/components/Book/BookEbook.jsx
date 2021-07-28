import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {saveToPublic} from "../../services/shelves.services"
import Default from "../../images/default.jpeg"


function BookEbook(props) {

	const [userState, setUserState] = useState({})
	const [bookState, setBookState] = useState({})
	useEffect(() => {setUserState(props.user)}, [])
	useEffect(() => {setBookState(props.book)}, [])

	const {book} = props
	const {user} = props

	const bookshelfId = user.publicBookshelf._id
	console.log("bookshelf is: ", bookshelfId)
	const shelves = user.publicBookshelves ? user.publicBookshelves.dynamicShelves : []

	function style(cover) {
		return {
		backgroundImage: `url(${cover})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover"
		}
	}


    function checkThumbnailExists(book) {
		if (book.cover) {
			return (
				<div className="book-cover" key={book.cover} style={style(book.cover)} alt="book cover"></div>
			)
		} else {
            return ( 
				<div className="book-cover" style={style(Default)} alt="book cover"></div>
            )
        }
	}
 

	return (
        <div className="book">
	        <div className="book-top">
	              { checkThumbnailExists(book) }
	            <div className="book-shelf-changer">
	                <select onChange={(event) => saveToPublic(bookshelfId, event.target.value, book)}>
	                  <option selected disabled>Add to...</option>
					  <option value="wantToRead">Want to Read</option>
	                  <option value="currentlyReading">Currently Reading</option>
	                  <option value="read">Read</option>
	                  {shelves.map(shelf => <option value={shelf._id}>{shelf.name}</option>)}
	                </select>
	            </div>
	        </div>
	        <div className="book-title" key={book.title}>{book.title}</div>
	        <div className="book-author" key={book.author}>{book.author}</div>
        </div>
	); 
};

export default BookEbook;
