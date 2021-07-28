import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = (props) => {
	const {user} = props

	return (
		<nav>
			<Link to={'/'} className='nav__projectName'>
				BestReads
			</Link>

			<div className='nav__authLinks'>
				{props.user ? (
					<>
						<Link to={'/search'} className='authLink'>
							Search book
						</Link>
						<Link to={'/ebook/create'} className='authLink'>
							Create an eBook
						</Link>
						<Link to={`/auth/profile/user`} className='authLink'>
							User page
						</Link>

						<button className='nav-logoutbtn' onClick={props.handleLogout}>
							Logout
						</button>
					</>
				) : (
					<>
						<Link to={'/auth/signup'} className='authLink'>
							Signup
						</Link>
						<Link to={'/auth/login'} className='authLink'>
							Log In
						</Link>
						<Link to={'/ebook/create'} className='authLink'>
							Create Ebook
						</Link>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;

