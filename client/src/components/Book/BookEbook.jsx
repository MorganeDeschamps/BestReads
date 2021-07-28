import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {saveToPublic} from "../../services/shelves.services"


/*
PUBLIC
router.put("/moveBook", (req, res) => {
  const {bookshelfId, shelfFrom, shelfTo, booksFrom, booksTo} = req.body
  let result;

PRIVATE
router.put("/moveBook", (req, res) => {
    const {bookshelfId, shelfFrom, shelfTo, booksFrom, booksTo} = req.body
    let result;
  


//router.put("/addBook", (req, res) => {
//const {bookshelfId, shelf, ebook} = req.body


  	author: eachWork.author_name,
	title: eachWork.title,
    olLink: `https://openlibrary.org${eachWork.key}`
	cover: url

*/



function BookEbook(props) {

	const [userState, setUserState] = useState({})
	const [bookState, setBookState] = useState({})
	useEffect(() => {setUserState(props.user)}, [])
	useEffect(() => {setBookState(props.book)}, [userState])

	const {book} = props
	const {user} = props

	const bookshelfId = user.publicBookshelf._id
	const shelves = user.publicBookshelves ? user.publicBookshelves.dynamicShelves : []


    function checkThumbnailExists(book) {
		if (book.cover) {
			return (
				<div className="book-cover" key={book.cover} style={{ backgroundImage: `url(${book.cover})`}} alt="book cover"></div>
			)
		} else {
            return ( 
				<div className="book-cover" style={{ backgroundImage: `url(${"../../images/default-book.jpeg"})`}} alt="book cover"></div>
            )
        }
	}
 

	return (
        <div className="book">
	        <div className="book-top">
	              { checkThumbnailExists(book) }
	            <div className="book-shelf-changer">
	                <select onChange={(event) => saveToPublic(bookshelfId, event.target.value, book)} defaultValue="wantToRead">
	                  <option value="none" disabled>Add to...</option>
	                  <option value="currentlyReading">Currently Reading</option>
	                  <option value="wantToRead">Want to Read</option>
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
