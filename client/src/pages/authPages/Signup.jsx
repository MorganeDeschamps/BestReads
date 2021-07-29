import React, { useState } from 'react';
import { signup } from '../../services/auth';
import './auth.css';
import * as CONSTS from '../../utils/consts';
import * as PATHS from '../../utils/paths';
import HomePage from '../Home.page';
import '../../utils/Forms.css'
import { Link } from 'react-router-dom';


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
			if (!res.data) {
				console.log('error');
			}
			else {
			localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
			props.authenticate(res.data.user);
			props.history.push(PATHS.HOMEPAGE);
			}
		});

	};

	return (
		<div className="page-container">
			<HomePage />
			<div className="signup-form-container">
				<h1>Sign Up</h1>
				<p className="account">Account? <Link to="/auth/login" className="account">Log In</Link></p>
				<form onSubmit={handleSubmit} className="login-form">
					<div className="inputs">
						<label htmlFor='login-form-text'>Username</label>
						<input
							type='text'
							name='username'
							placeholder='Username'
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="inputs">
						<label htmlFor='login-form-text'>Email</label>
						<input
							type='text'
							name='email'
							placeholder='Email'
							value={formData.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div className="inputs">
						<label htmlFor='login-form-text'>Password</label>
						<input
							type='password'
							name='password'
							placeholder='Password'
							value={formData.password}
							onChange={handleChange}
							required
							minLength='8'
						/>
					</div>
					<div className="inputs">
						<button className='button__submit' type='submit'>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Signup;
