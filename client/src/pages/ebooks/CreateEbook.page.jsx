import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createEbook} from "../../services/ebook.services"


function CreateEbook(props) {
	//form needs  { title, author, coverUrl, ebookUrl, owner, shelfId}
	const user = props.user

	const initialState = {
		title: "",
		author: "",
		coverUrl: "",
        ebookUrl: "", 
		owner: user._id,
		shelf: ""
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




	function notify(status, message) {
		if(status === "success") toast.warning(message, {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
		else toast.error(message, {
			position: "top-right",
			autoClose: 3000,
			hideProgressBar: true,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		})
	}



	function success() {
		setFormData(initialState)
		notify("success", "Your Ebook was added to your bookshelf!")
	}
	

	function handleChange(event) {
		const {name, value} = event.target
        setFormData({...formData, [name]: value})
	}

	function handleSubmit(event) {
		event.preventDefault()
		createEbook(formData).then(res => res.status === true ? success() : notify("error", "There was an issue creating your Ebook") )
	}


	return (
		<div>
			<ToastContainer/>
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
				<label htmlFor="input-bookshelf">Add to: </label>
				<select onChange={(event) => setFormData({...formData, shelf: event.target.value})}>
	                  {user.privateBookshelf.shelves.map(shelf => <option name="shelf" value={shelf._id}>{shelf.name}</option>)}
				</select>
 
				<br /><br />
				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
}

export default CreateEbook;
