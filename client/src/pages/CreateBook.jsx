import React, { useState } from 'react';
import {handleUpload} from "../services/book.services"
import {create} from "../services/book.services"

import './auth.css';
import * as CONSTS from '../utils/consts';
import * as PATHS from '../utils/paths';



function CreateBook(props) {
    
    const user = props.user;

	const initialState = {
		title: "",
		author: "",
		coverUrl: "",
        epubUrl: "",
        epubTest: ""
	};

	const [formData, setFormData] = useState(initialState);
    const [testState, setTest] = useState("")

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	  
	const handleCoverUpload = (event) => {
	
		const uploadData = new FormData();
		uploadData.append('imageUrl', event.target.files[0]);        
        console.log("test cover", uploadData)
		
		handleUpload(uploadData)
		  .then(response => {
            console.log("cover: ", response)
			setFormData({ ...formData, "coverUrl": response.data.secure_url});
		  })
		  .catch(err => console.log('Error while uploading the file: ', err));
	};


/*     const handleEpubUpload = (event) => {
	
		const uploadData = new FormData();
		uploadData.append('imageUrl', event.target.files[0]);
        console.log("test epub", uploadData)
		
		epubUpload(uploadData)
		  .then(response => {
            console.log("epub: ", response)
			setFormData({ ...formData, "epubUrl": response.data.secure_url});
		  })
		  .catch(err => console.log('Error while uploading the file: ', err));
	};

	  */

	const handleSubmit = (event) => {
		event.preventDefault();

		create(formData).then((res) => {
			// successful book creation
			if (!res.status) {
				console.log('error creating the book');
			}
            setFormData(initialState)
		});
	};



/* 

    const handleEpubTest = (event) => {
        const {value } = event.target;
		setTest(value)
	};

    const testSubmit = (event) => {
        event.preventDefault();

        epubTest(testState)
		  .then(response => {
            console.log("epubtest: ", response)
		  })
		  .catch(err => console.log('Error while uploading the file: ', err));

    }



 */


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

				<label htmlFor='input-cover'>Book cover</label>
				<input type="file" onChange={handleCoverUpload} />

{/*                 <label htmlFor='input-epub'>Epub file</label>
				<input type="file" onChange={handleEpubUpload} />
 */}

				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>

{/*             <form onSubmit={testSubmit}>
            <label htmlFor='input-epub'>Epub url</label>
				<input type="text" name='epubTest' value={testState} onChange={handleEpubTest} />
                <button className='button__submit' type='submit'>
					Submit
				</button>

            </form> */}
		</div>
	);
}

export default CreateBook;
