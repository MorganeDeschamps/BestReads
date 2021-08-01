import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import "./NavbarTest.css"


//login / logout 
//search
//public bookshelf
//private bookshelf
//create ebook
//user page

const Navbar = (props) => {
	const [ulState, setUl] = useState("")
	const [burgerState, setBurger] = useState("")

	function toggle() {
		ulState === "" ? setUl("show") : setUl("")
		burgerState === "" ? setBurger("show-x") : setBurger("")
	}

	return (

		<nav>
			<Link to='/' className='homeLogo'>Best Reads</Link>

	<button onClick={toggle} id="burger" className={`burger ${burgerState}`}>
		<div className="bar"></div>
		<div className="bar"></div>
	</button>
	
	<ul className={ulState}>
	{props.user ? (
		<>
		<li><Link to='/' activeclassname='homebutton' onClick={toggle}>Home</Link></li>
		<li><Link to='/search' activeclassname="active-link" onClick={toggle}>Searchbook</Link></li>
		<li><Link to='/user/publicBookshelf' activeclassname='authLink' onClick={toggle}>My public bookshelf</Link></li>
		<li><Link to='/user/privateBookshelf' activeclassname='authLink' onClick={toggle}>My private bookshelf</Link></li>
		<li><Link to='/ebook/create' activeclassname='authLink' onClick={toggle}>Create an eBook</Link></li>
		<li><Link to="#" className='nav-logoutbtn' onClick={props.handleLogout}>Logout</Link></li>
		</>
	) : (
		<>
		<li><Link to='/' className='authLink' onClick={toggle}>Home</Link></li>
		<li><Link to='/auth/signup' activeclassname='authLink' onClick={toggle}>Signup</Link></li>
		<li><Link to='/auth/login' className='authLink' onClick={toggle}>Log In</Link></li>
		</>
	)}
	</ul>
</nav>

	)
};



export default Navbar;

