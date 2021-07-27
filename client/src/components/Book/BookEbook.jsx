import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicBookshelfModel, { PublicBookshelf } from '../../../../server/models/PublicBookshelf.model';

import {getOneBook} from "../services/api.services"



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


*/



function BookEbook(props) {

	//props will pass either a book id (olid) or ebook id (DB id)
	const [bookData, setBookData] = useState({})
	const [eBookData, setEbookData] = useState({})

    //const {cover, title, author} = props
    //const { book, changeShelf, shelfID } = props


	const {book} = props


    function checkThumbnailExists(book) {
		if (book.cover) {
			return (
				<div className="book-cover" key={book.imageLinks.thumbnail} style={{ backgroundImage: `url(${book.imageLinks.thumbnail})`}} alt="book cover"></div>
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

export default BookEbook;
