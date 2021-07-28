import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Hamburger from './Hamburger'

export default function Navbar(props){
	const {user} = props
	
	const [hamburgerOpen, setHamburgerOpen] = useState(false);

	const toggleHamburger = () =>{
		setHamburgerOpen(!hamburgerOpen)
	}
	return (
		<div>
			<div className="navigation">
				<Link to={'/'} className='nav__projectName'>BestReads</Link>
				<ul>
					<li><Link to={`/auth/profile/user`} className='authLink'>User page</Link></li>
					<li><Link to={'/search'} className='authLink'>Search book</Link></li>
					<li><Link to={'/ebook/create'} className='authLink'>Create an eBook</Link></li>
					<li><button className='nav-logoutbtn' onClick={props.handleLogout}>Logout</button></li>
				</ul>
				<div className="hamburger" onClick={toggleHamburger}>
					<Hamburger />
				</div>

			</div>

			
		{/* 		<Link to={'/'} className='nav__projectName'>
				BestReads
				</Link>

			<div className='nav__authLinks'>
				{props.user ? (
					<>
			<div className="navigation">
				<Link to={'/'} className='nav__projectName'>BestReads</Link>
				<ul>
					<li><Link to={`/auth/profile/user`} className='authLink'>User page</Link></li>
					<li><Link to={'/search'} className='authLink'>Search book</Link></li>
					<li><Link to={'/ebook/create'} className='authLink'>Create an eBook</Link></li>
					<li><button className='nav-logoutbtn' onClick={props.handleLogout}>Logout</button></li>
				</ul>
				<div className="hamburger" onClick={toggleHamburger}>
					<Hamburger />
				</div>
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
				)}*/}
			</div>



	);
};

