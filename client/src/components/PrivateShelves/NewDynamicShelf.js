import React, { useState } from 'react'
import {newPrivateShelf} from '../../services/shelves.services'
import "./NewShelf.css"


// CREATE NEW DYNAMIC SHELF

function CreatePrivateShelf(props) {
	const {updateUser, toggleHandler} = props
	const {bookshelfId} = props
    
	const initialFormState = {
		name: "",
		ebooks: [],
		privateBookshelf: ""
	};

	const [formState, setFormState] = useState(initialFormState);


	function handleChange(event) {
        const {name, value} = event.target;
        setFormState({...formState, [name]: value, privateBookshelf: bookshelfId})

	}


	function handleSubmit(event) {
        event.preventDefault()
		return newPrivateShelf(formState)
		.then(shelf => {console.log("new shelf: ", shelf) ; updateUser() ; toggleHandler()})
		.catch(err => console.log(err))
	}


	return (
  			    <div className="modal-body">
  			      <div className="column" id="main">
					<a nohref="true" title="Close" className="modal-close" onClick={toggleHandler}>Close</a>
  			        <h1 className="create-shelf-title">Create a new Shelf: </h1>
  			        <form onSubmit={handleSubmit} className='new-shelf-form'>
  			          <div className="form-group">
  			            <label htmlFor="exampleInputName">Name: </label><br></br>
  			            <input type='text' className="new-shelf-input" name='name' placeholder='e.g. Best Sci-Fi 2020' value={formState.name} onChange={handleChange} required />
  			          </div>
  			          <button type="submit" className="new-shelf-button">Submit</button>
  			        </form>
  			      </div>
  			    </div>
	);
}

export default CreatePrivateShelf;

/* 



		<div className="modal fade" id="exampleModal" style={{overlay: {backgroundColor: 'papayawhip'}, content: {color: 'lightsteelblue'}}} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  			<div className="modal-dialog" role="document">

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










<!-- Button trigger modal -->
<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Sign Up
</button>

<!-- Modal -->
<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-body">
        <div className="column" id="main">
          <h1>Create Shelf: </h1>
          <form onSubmit={handleSubmit} className='new-shelf-form'>
            <div className="form-group">
              <label for="exampleInputName">Name</label>
              <input type='text' className="form-control" name='name' placeholder='Name your new shelf' value={formState.name} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary button__submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div> */