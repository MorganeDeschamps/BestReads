import React, { useState } from 'react';
import * as CONSTS from '../../utils/consts';
import * as PATHS from '../../utils/paths';

import {createEbook} from "../../services/ebook.services"
import {widgetCover, widgetEbooks} from "../../services/widget.services"

function CreateEbook(props) {
    //form needs { title, author, coverUrl, ebookUrl, owner, bookshelfId, shelf} 
	const initialState = {
		title: "",
		author: "",
		coverUrl: "",
        ebookUrl: "", 
		owner: "", 
		bookshelfId: "", 
		shelf:""
	};

	const [formData, setFormData] = useState(initialState);
	const [test, setTest] = useState("")

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
				<label htmlFor='input-ebook'>Ebook</label><br />
				<input type="button" className="cloudinary-button" onClick={widgetEbooks} value="Add an ebook file"/>

				<br /><br />
				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>


		</div>
	);
}

export default CreateEbook;
