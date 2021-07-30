import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {createEbook} from "../../services/ebook.services"
import '../../components/Book/BookEbook'
import '../../utils/Forms.css'


function CreateEbook(props) {
	//form needs  { title, author, coverUrl, ebookUrl, owner, shelfId}
	const user = props.user
	const shelf = user.privateBookshelf.shelves.find(shelf => shelf.name === "Main shelf")

	const initialState = {
		title: "",
		author: "",
		coverUrl: "",
        ebookUrl: "", 
		owner: user._id,
		shelf: shelf._id
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
		<div className="ebook-create-container">
			<ToastContainer/>
			<h1>Create Your Ebook </h1>
			
			<form onSubmit={handleSubmit} className='new-book-form'>
				<div className="inputs-search">
					<label htmlFor='input-title'>Title</label>
					<input
					id='input-title'
					type='text'
					name='title'
					placeholder='Name Your Ebook'
					value={formData.title}
					onChange={handleChange}
					required
					/>

				</div>
				<div className="inputs-search">
					<label htmlFor='input-author'>Author</label>
					<input
					id='input-author'
					type='text'
					name='author'
					placeholder='Name'
					value={formData.author}
					onChange={handleChange}
					required
					/>
				</div>

				<div className="inputs-search">
					<label htmlFor='input-cover'>Cover</label>
					<input type="button" className="cloudinary-button" onClick={widgetCover} value="Add a cover"/>
				</div>


				<div className="inputs-search">
					<label htmlFor='input-ebook'>Ebook file</label>
					<input type="button" className="cloudinary-button" onClick={widgetEbooks} value="Add an ebook file"/>
				</div>

				<div className="inputs-search">
				<label htmlFor="input-bookshelf">Add to </label>
				<select onChange={(event) => setFormData({...formData, shelf: event.target.value})}>
	                  {user.privateBookshelf.shelves.map(shelf => <option name="shelf" value={shelf._id}>{shelf.name}</option>)}
				</select>
				</div>
				<div className="inputs-search">
					<button className='button__submit' type='submit'>Submit</button>
				</div>
			</form>
		</div>
	);
}

export default CreateEbook;
