import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {newPublicShelf} from '../../services/shelves.services'


// CREATE NEW DYNAMIC SHELF

function CreatePublicShelf(props) {
	const {appendToPubShelf, updateUser} = props
	console.log('this is the data', appendToPubShelf)
    
	const initialFormState = {
		name: "",
		books: [],
		publicBookshelf: ""
	};

	const [formState, setFormState] = useState(initialFormState);


	function handleChange(event) {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value, publicBookshelf: appendToPubShelf._id})

	}


	function handleSubmit(event) {
        event.preventDefault()
		//setFormState(newShelf)
		return newPublicShelf(formState)
		.then(shelf => {appendToPubShelf.dynamicShelves = {...appendToPubShelf.dynamicShelves, shelf}; updateUser()})
		.catch(err => console.log(err))
        
	}


	return (
		<div>
			<h1>Create Shelf: </h1>
			<form onSubmit={handleSubmit} className='new-shelf-form'>
				<label>Name: </label>
				<input type='text' name='name' placeholder='Name your new shelf' value={formState.name} onChange={handleChange} required />
				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>

		</div>
	);
}

export default CreatePublicShelf;