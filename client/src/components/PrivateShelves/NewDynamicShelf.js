import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import * as shelfMethods from '../../services/shelves.services'


// CREATE NEW DYNAMIC SHELF

function CreatePrivateShelf(props) {
	const {appendToShelf} = props
	console.log("without props. :" , appendToShelf)
	console.log("with props. :" , props.appendToShelf)
    
	const initialFormState = {
		name: "",
		ebooks: [],
	};

	const [formState, setFormState] = useState(initialFormState);


	function handleChange(event) {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value})

	}

	function handleSubmit(event) {
        event.preventDefault()
        const {name, ebooks} = formState
        return (
            shelfMethods.newPrivateShelf(formState)
            .then(shelf => {console.log("test: ", shelf) ; setFormState(initialFormState)})
            .catch(err => console.log(err))
        )
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