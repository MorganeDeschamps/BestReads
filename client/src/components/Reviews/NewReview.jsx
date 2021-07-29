import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../services/auth'
import {createReview} from '../../services/review.services'
import "./Review.css"


// CREATE NEW REVIEW

function NewReview(props) {
	const {bookId} = props.match.params

	const initialFormState = {
		owner: "",
		comment: "",
		bookId: bookId
	};


	const [userState, setUser] = useState({})
	const [formState, setFormState] = useState(initialFormState);
	useEffect(() => {getUser().then(result => setUser(result))}, [])
	useEffect(() => {setFormState({...formState, owner: userState._id}) ; console.log("userState from review: ", userState)}, [userState])


	function handleChange(event) {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value})

	}

	function handleSubmit(event) {
		event.preventDefault()
		return createReview(formState)
		.then(review => console.log("review submitted: ", review))
		.catch(err => console.log(err))

	}


	function ratingSelect(event) {
		setFormState({...formState, rating: event.target.value})
	}


	useEffect(() => {console.log("form: ", formState)}, [userState])


	//console.log("user: ", props.user ? props.user._id : "nope")
	//{setFormState({...formState, owner: props.user._id})}





	
	return (
		<div>
			<h1>Book review: </h1>
{/* 			<form onSubmit={handleSubmit} className='new-shelf-form'>
				<label>Review</label>
				<input type='text'name='comment' placeholder='Give us your thoughs' value={formState.comment} onChange={handleChange} required />
				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form> */}
			<div class="container p-3">
  				<form onSubmit={handleSubmit} class="row">
 
      				<div class="stars text-center">
      					<div class="col-md-12">
          					<div class="form-group">
 
            					<input onClick={ratingSelect} type="radio" id="five" name="rate" value="5"/>
            					<label for="five"></label>
            					<input onClick={ratingSelect} type="radio" id="four" name="rate" value="4" />
            					<label for="four"></label>
            					<input onClick={ratingSelect} type="radio" id="three" name="rate" value="3"/>
            					<label for="three"></label>
            					<input onClick={ratingSelect} type="radio" id="two" name="rate" value="2"/>
            					<label for="two"></label>
            					<input onClick={ratingSelect} type="radio" id="one" name="rate" value="1" />
            					<label for="one"></label>
 
            					<span class="result"></span>
 
          					</div>
        				</div>
      				</div>
      				<div class="col-md-6">
        				<div class="form-group">
          					<label for="textarea"><b>Review:</b></label>
 
          					<textarea value={formState.comment} name="comment" onChange={handleChange} required class="form-control" id="textarea" rows="4" placeholder="What did you think of this book?"></textarea>
        				</div>
      				</div>
      				<div class="col-md-12 text-right">
        				<button type="submit" class="btn btn-primary">Review</button>
      				</div>
  				</form>
			</div>
		</div>
	);
} 

export default NewReview;