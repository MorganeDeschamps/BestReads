import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUser } from '../../services/auth'
import {createReview} from '../../services/review.services'
import "./Review.css"

//const [userState, setUser] = useState({})
//	useEffect(() => {getUser().then(result => setUser(result))}, [])
// useEffect(() => {setFormState({...formState, owner: userState._id}) ; console.log("userState from review: ", userState)}, [userState])
// CREATE NEW REVIEW

function NewReview(props) {
	const {user, bookId} = props

	const initialFormState = {
		owner: user && user._id,
		comment: "",
		bookId: bookId,
		rating: null
	};



	const [formState, setFormState] = useState(initialFormState);



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


	//useEffect(() => {console.log("form: ", formState)}, [userState])


	//console.log("user: ", props.user ? props.user._id : "nope")
	//{setFormState({...formState, owner: props.user._id})}





	
	return (
		<div  class="review-div">
			<h3>Book review: </h3>
			<div className="container p-3">
  				<form onSubmit={handleSubmit} className="row">
 
      				<div className="stars text-reviewCenter">
      					<div className="col-md-12">
          					<div className="form-group">
 
            					<input onClick={ratingSelect} type="radio" id="five" name="rate" value="5"/>
            					<label htmlFor="five"></label>
            					<input onClick={ratingSelect} type="radio" id="four" name="rate" value="4" />
            					<label htmlFor="four"></label>
            					<input onClick={ratingSelect} type="radio" id="three" name="rate" value="3"/>
            					<label htmlFor="three"></label>
            					<input onClick={ratingSelect} type="radio" id="two" name="rate" value="2"/>
            					<label htmlFor="two"></label>
            					<input onClick={ratingSelect} type="radio" id="one" name="rate" value="1" />
            					<label htmlFor="one"></label>
 
            					<span className="result"></span>
 
          					</div>
        				</div>
      				</div>
      				<div className="col-md-6">
        				<div className="form-group">
          					<label htmlFor="textarea"><b>Review:</b></label>
 
          					<textarea value={formState.comment} name="comment" onChange={handleChange} required className="form-control" id="textarea" rows="4" placeholder="What did you think of this book?"></textarea>
        				</div>
      				</div>
      				<div className="col-md-12 text-right">
        				<button type="submit" className="btn btn-primary">Review</button>
      				</div>
  				</form>
			</div>
		</div>
	);
} 

export default NewReview;