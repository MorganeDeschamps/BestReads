import React, { useState } from 'react';
import { signup, handleUpload} from '../services/auth';
import './auth.css';
import * as CONSTS from '../utils/consts';
import * as PATHS from '../utils/paths';

function Signup(props) {
	const { authenticate } = props;

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

	  
	const handleFileUpload = (event) => {
	
		const uploadData = new FormData();
		uploadData.append('imageUrl', event.target.files[0]);
		
		handleUpload(uploadData)
		  .then(response => {
			setFormData({ ...formData, "imageUrl": response.data.secure_url });
		  })
		  .catch(err => console.log('Error while uploading the file: ', err));
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


				<label htmlFor='input-image'>Profile picture</label>
				<input type="file" onChange={handleFileUpload} />

				<button className='button__submit' type='submit'>
					Submit
				</button>
			</form>
		</div>
	);
}

export default Signup;
