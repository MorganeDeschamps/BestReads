import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {createReview} from '../../services/review.services'



// CREATE NEW REVIEW

function NewReview(props) {
	const {book} = props
	console.log('this is the book', book)

    
	const initialFormState = {
		owner: "",
		comment: "",
	};

	const [formState, setFormState] = useState(initialFormState);


	function handleChange(event) {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value, bookId: book._id})

	}

	function handleSubmit(event) {
		event.preventDefault()
		return createReview(formState)
		.then(review => {book._id = {...book._id, review}})
		.catch(err => console.log(err))

	}


	return (
		<div>
			<h1>Book review: </h1>
			<form onSubmit={handleSubmit} className='new-shelf-form'>
				<label>Review</label>
				<input type='text'name='comment' placeholder='Give us your thoughs' value={formState.comment} onChange={handleChange} required />
				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>

		</div>
	);
} 

export default NewReview;