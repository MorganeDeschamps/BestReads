import React, { useEffect, useState } from 'react';
import * as CONSTS from '../../utils/consts';
import * as PATHS from '../../utils/paths';

import {createEbook} from "../../services/ebook.services"
import {widgetEbooks} from "../../services/widget.services"
import axios from 'axios';


function CreateEbook(props) {
    //form needs { title, author, coverUrl, ebookUrl, owner, bookshelfId, shelf} 
	const user = props.user

	const initialState = {
		title: "",
		author: "",
		coverUrl: "",
        ebookUrl: "", 
		owner: user._id,
		bookshelf: user.privateBookshelf, 
		shelf: "staticShelf"
	};

	const [formData, setFormData] = useState(initialState);
	console.log("test: ", formData)

	//COVER IMAGE WIDGET
	function getCoverUrl(result) {
		if(result.event === "success") {
			setFormData({...formData, coverUrl: result.info.secure_url})
		}
	}

	function widgetCover(event){ 

		window.cloudinary.createUploadWidget({ 
		cloudName: "best-reads", 
		uploadPreset: "bestReads-bookCovers",
		cropping: true
		}, (error, result) => {getCoverUrl(result)}).open()
	}



	//EBOOK FILE WIDGET
	function getEbookUrl(result) {
		if(result.event === "success") {
			setFormData({...formData, ebookUrl: result.info.secure_url})
		}
	}

 	function widgetEbooks(event) {

    window.cloudinary.createUploadWidget({ 
    cloudName: "best-reads", 
    uploadPreset: "bestReads-ebooks" 
    }, (error, result) => {getEbookUrl(result)}).open()

	}

	
	

	function handleChange(event) {
		const {name, value} = event.target
        setFormData({...formData, [name]: value})
	}

	function handleSubmit(event) {
		event.preventDefault()
		createEbook(formData)
	}


	return (
		<div>
			<h1>Create book: </h1>
			<form onSubmit={handleSubmit} className='new-book-form'>
				<label htmlFor='input-title'>Title</label><br />
				<input
					id='input-title'
					type='text'
					name='title'
					placeholder='Text'
					value={formData.title}
					onChange={handleChange}
					required
				/>
				<br /><br />
				<label htmlFor='input-author'>Author</label><br />
				<input
					id='input-authot'
					type='text'
					name='author'
					placeholder='Text'
					value={formData.author}
					onChange={handleChange}
					required
				/>
				<br /><br />
				<label htmlFor='input-cover'>Cover</label><br />
				<input type="button" className="cloudinary-button" onClick={widgetCover} value="Add a cover"/>

				<br /><br />
				<label htmlFor='input-ebook'>Ebook file</label><br />
				<input type="button" className="cloudinary-button" onClick={widgetEbooks} value="Add an ebook file"/>

				<br /><br />
				{(user.privateBookshelf.dynamicShelves.length > 0) && 
				<>
				<label htmlFor="input-bookshelf">Add to: </label>

				<input list="bookshelves" onChange={handleChange}/>
				<datalist id="bookshelves">
					<option name="shelf" value="staticShelf">---Shelf---</option>
					<option name="shelf" value="staticShelf" label="Main shelf"></option>
    				{user.privateBookshelf.dynamicShelves.map((eachShelf) => <option name="shelf" value={eachShelf} label={eachShelf.name}/>
					)}
  				</datalist>
				</>
				}
 
				<br /><br />
				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>


		</div>
	);
}

export default CreateEbook;
