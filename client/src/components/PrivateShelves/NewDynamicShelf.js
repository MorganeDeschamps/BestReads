import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {newPrivateShelf} from '../../services/shelves.services'


// CREATE NEW DYNAMIC SHELF

function CreatePrivateShelf(props) {
	const {appendToShelf, updateUser} = props
	console.log('this is the data', appendToShelf)
    
	const initialFormState = {
		name: "",
		ebooks: [],
		privateBookshelf: ""
	};

	const [formState, setFormState] = useState(initialFormState);


	function handleChange(event) {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value, privateBookshelf: appendToShelf._id})

	}

	//const newShelf = appendToShelf.dynamicShelves
	// need use effect

	function handleSubmit(event) {
        event.preventDefault()
		//setFormState(newShelf)
		return newPrivateShelf(formState)
		.then(shelf => {appendToShelf.dynamicShelves = {...appendToShelf.dynamicShelves, shelf}; updateUser()})
		.catch(err => console.log(err))
		
	/* 	return (
			setFormState(newShelf)
			.then(shelf => {console.log("test: ", shelf) ; setFormState(initialFormState)})
            .catch(err => console.log(err)) */
		
	/* 	.then(shelf => setFormState(initialFormState))
		.catch(err => console.log(err)) */
        
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

export default CreatePrivateShelf;