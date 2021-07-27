import React, { useState } from 'react';
import { signup } from '../../services/auth';
import './auth.css';
import * as CONSTS from '../../utils/consts';
import * as PATHS from '../../utils/paths';
import {createBookshelves} from "../../services/bookshelves.services"

function Signup(props) {
	//const { authenticate } = props;

	const initialState = {
		username: '',
		email: '',
		password: '',
		imageUrl: ""
	};

	const [formData, setFormData] = useState(initialState);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value
		});
	};


	const handleSubmit = (event) => {
		event.preventDefault();

		signup(formData).then((res) => {
			// successful signup
			if (!res.status) {
				console.log('error');
			}
			localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
			props.authenticate(res.data.user);
			props.history.push(PATHS.HOMEPAGE);
		});

		//createBookshelves(userId).then().catch()

	};

	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} className='auth__form'>
				<label htmlFor='input-username'>Username</label>
				<input
					id='input-username'
					type='text'
					name='username'
					placeholder='Text'
					value={formData.username}
					onChange={handleChange}
					required
				/>

				<label htmlFor='input-username'>Email</label>
				<input
					id='input-email'
					type='text'
					name='email'
					placeholder='Text'
					value={formData.email}
					onChange={handleChange}
					required
				/>

				<label htmlFor='input-password'>Password</label>
				<input
					id='input-password'
					type='password'
					name='password'
					placeholder='Password'
					value={formData.password}
					onChange={handleChange}
					required
					minLength='8'
				/>

				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
}

export default Signup;
