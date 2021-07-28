import React, { useEffect, useState } from 'react';
import Default from "../../images/default.jpeg"
import "../../App.css"
import { movePrivate, movePublic } from '../../services/shelves.services';
import { editEbook } from '../../services/ebook.services';
import { deleteEbook } from '../../services/ebook.services';
import { deleteBook } from '../../services/shelves.services';

//actions private: movePrivate, delete, edit
//actions public: movePublic, delete

function BookEbook(props) {
	//const {book} = props
	const shelves = props.bookshelf.shelves;
	const book = props.book
	const {updateUser} = props

	function action(bsType, toDo, args) {
		const {bookId} = args;
		console.log(toDo)

		if(bsType === "public") {
			if (toDo === "delete") {return deleteBook(props.shelf, bookId)}
			else {return movePublic(args)}
		}
		else {
			if (toDo === "delete") {return deleteEbook(bookId)}
			else if (toDo === "edit") {console.log("edit")}
			else {return movePrivate(args)}
		}
	}


	function style(cover) {
		return {
		backgroundImage: `url(${cover})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover"
		}
	}


    function checkThumbnailExists(book) {
		if (book.coverUrl) { return (<div className="book-cover" key={book.coverUrl} style={style(book.coverUrl)} alt="book cover"></div>)} 
		else {return (<div className="book-cover" style={style(Default)} alt="book cover"></div>)}
	}
 
	return (
        <div key={book._id}  className="book">
	        <div className="book-top">
	              { checkThumbnailExists(book) }
	            <div className="book-shelf-changer">
	                <select onChange={(event) => action(props.bsType, event.target.value, {shelfFrom: props.shelf, shelfTo: event.target.value, bookId: book._id}).then(res => res.status === true ? updateUser() : console.log(res))}>
					<optgroup label="Move to:"></optgroup>
	                  {shelves.map(shelf => <option value={shelf._id}>{shelf.name}</option>)}
					<optgroup label="--------"></optgroup>
	                  <option value="delete" >Delete</option>
					  {(props.bsType === "private") && <option value="edit">Edit</option>}
	                </select>
	            </div>
	        </div>
	        <div className="book-title" key={book.title}>{book.title}</div>
	        <div className="book-author" key={book.author}>{book.author}</div>
        </div>
	); 
};

export default BookEbook;
