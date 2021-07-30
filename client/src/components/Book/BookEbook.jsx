import React, { useEffect, useState } from 'react';
import Default from "../../images/default.jpeg"
import "../../App.css"
import { movePrivate, movePublic } from '../../services/shelves.services';
import { editEbook } from '../../services/ebook.services';
import { deleteEbook } from '../../services/ebook.services';
import { deleteBook } from '../../services/shelves.services';
import { Link } from 'react-router-dom';

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

	function eBookReader(book) {
		if(book.ebookUrl) return (
		<Link to={`/reader/${book._id}`} target="blank" className="link-tag" style={{position: "absolute", top: 0, right: 0, bottom: 0, left: 0, width: "100%", height: "100%"}}></Link>
		)
	}

	function coverFlip(book) {

		if(book.ebookUrl) {return (
			<div className="flip-card">
  				<div className="flip-card-inner">
					<div className="book-cover flip-card-front" key={book.coverUrl} style={book.coverUrl ? style(book.coverUrl) : style(Default)} 		alt="book cover"></div>
    				<div className="flip-card-back">
						{eBookReader(book)}
    				</div>
  				</div>
			</div>
		)}
		else { return (
			<div className="book-cover" style={book.coverUrl ? style(book.coverUrl) : style(Default)} alt="book cover"></div>
		)}

	}

/* 
    function checkThumbnailExists(book) {
		if (book.coverUrl) { return (
		<div className="book-cover" key={book.coverUrl} style={style(book.coverUrl)} alt="book cover">
		{eBookReader(book)}
		</div>)} 
		else {return (
		<div className="book-cover" style={style(Default)} alt="book cover">
		{eBookReader(book)}
		</div>)}
	}
 */

	return (
        <div key={book._id}  className="book">
	        <div className="book-top">
	              { coverFlip(book) }
	            <div className="book-shelf-changer">
	                <select className="book-shelf-changer-select" onChange={(event) => action(props.bsType, event.target.value, {shelfFrom: props.shelf, shelfTo: event.target.value, bookId: book._id}).then(res => res.status === true ? updateUser() : console.log(res))}>
					<optgroup selected label="Move to:"></optgroup>
	                  {shelves.map(shelf => <option value={shelf._id}>{shelf.name}</option>)}
					<optgroup label="--------"></optgroup>
	                  <option value="delete" >Delete</option>
					  {(props.bsType === "private") && <option value="edit">Edit</option>}
	                </select>
	            </div>
	        </div>
	        <div className="book-title" key={book.title}>{book.title}</div>
        </div>
	); 
};

export default BookEbook;
