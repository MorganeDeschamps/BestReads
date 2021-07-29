import React, { useState } from 'react';
import { login } from '../../services/auth';
import './Signup';
import * as CONSTS from '../../utils/consts';
import HomePage from '../Home.page';
import '../../utils/Forms.css'
import { Link } from 'react-router-dom';


function LogIn(props) {
	const { authenticate } = props;
	if(props.user && props.user._id) { props.history.push("/")} 

	const initialState = {
		username: '',
		password: ''
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

		const credentials = {
			username: formData.username,
			password: formData.password
		};

		login(credentials).then((res) => {
			if (!res.data) {
				console.log('error', res);
			} else {
			localStorage.setItem(CONSTS.ACCESS_TOKEN, res.data.accessToken);
			authenticate(res.data.user);
			props.history.push('/');
			}
		});
	};

	return (
		<div className="page-container">
			<HomePage />
			<div className="login-form-container">
				<h1>Log In</h1>
				<p className="account">No account? <Link to="/auth/signup" className="account">Sign Up</Link></p>
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
						<button className='login-form-text' type='submit'>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LogIn;
