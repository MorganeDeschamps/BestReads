import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



// CREATE NEW REVIEW

function CreateNewReview(props) {

    
	const initialFormState = {
		owner: "",
		comment: "",
        bookId: ""
	};

	/* const [formState, setFormState] = useState(initialFormState);


	function handleChange(event) {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value})

	}

	function handleSubmit(event) {
        event.preventDefault()
        const {name, ebooks} = formState
        return (
            shelfMethods.newPrivateShelf(formState)
            .then(shelf => setFormState(shelf))
            .catch(err => console.log(err))
        )
	}


	return (
		<div>
			<h1>Create Shelf: </h1>
			<form onSubmit={handleSubmit} className='new-shelf-form'>
				<label>Name: </label>
				<input type='text'name='name' placeholder='Name your new shelf' value={formState.name} onChange={handleChange} required />
				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>

		</div>
	);*/
} 

export default CreateNewReview;