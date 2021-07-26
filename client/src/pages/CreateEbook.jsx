import React, { useState } from 'react';
import './auth.css';
import * as CONSTS from '../utils/consts';
import * as PATHS from '../utils/paths';



function CreateBook(props) {
    
	const initialState = {
		title: "",
		author: "",
		coverUrl: "",
        epubUrl: "",
        epubTest: ""
	};

	const [formData, setFormData] = useState(initialState);


	function handleChange() {

	}

	function handleSubmit() {

	}

	function handleCoverUpload(event) {
		console.log("test: ", event.target.files[0])

	}

	function handleEpubUpload() {

	}


	return (
		<div>
			<h1>Create book: </h1>
			<form onSubmit={handleSubmit} className='new-book-form'>
				<label htmlFor='input-title'>Title</label>
				<input
					id='input-title'
					type='text'
					name='title'
					placeholder='Text'
					value={formData.title}
					onChange={handleChange}
					required
				/>

				<label htmlFor='input-author'>Author</label>
				<input
					id='input-authot'
					type='text'
					name='author'
					placeholder='Text'
					value={formData.author}
					onChange={handleChange}
					required
				/>

				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>

		</div>
	);
}

export default CreateBook;
