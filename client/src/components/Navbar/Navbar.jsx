import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
//import './Navbar.css';
import "./NavbarTest.css"


//login / logout 
//search
//public bookshelf
//private bookshelf
//create ebook
//user page

const Navbar = (props) => {
	const {user} = props
	const [navbarOpen, setNavbarOpen] = useState(false)
	const [ulState, setUl] = useState("")
	const [burgerState, setBurger] = useState("")

	const handleToggle = () => {
		setNavbarOpen(prev => !prev)
	}
	const closeMenu = () => {
		setNavbarOpen(false)
	}

	function toggle() {
		ulState === "" ? setUl("show") : setUl("")
		burgerState === "" ? setBurger("show-x") : setBurger("")
	}

	return (

		<nav>
	<p>BestReads</p>
	
	<button onClick={toggle} id="burger" className={`burger ${burgerState}`}>
		<div class="bar"></div>
		<div class="bar"></div>
	</button>
	
	<ul className={ulState}>
	{props.user ? (
		<>
		<li><Link to='/' activeClassName='homebutton' onClick={toggle}>Home</Link></li>
		<li><Link to='/search' activeClassName="active-link" onClick={toggle}>Searchbook</Link></li>
		<li><Link to='/ebook/create' activeClassName='authLink' onClick={toggle}>Create an eBook</Link></li>
		<li><Link to="/auth/profile/user" activeClassName='authLink' onClick={toggle}>User page</Link></li>
		<li><Link to="/review/test" activeClassName='authLink' onClick={toggle}>Review</Link></li>
		<li><Link className='nav-logoutbtn' onClick={props.handleLogout}>Logout</Link></li>
		</>
	) : (
		<>
		<li><Link to='/' className='authLink' onClick={toggle}>Home</Link></li>
		<li><Link to='/auth/signup' activeClassName='authLink' onClick={toggle}>Signup</Link></li>
		<li><Link to={'/auth/login'} className='authLink' onClick={toggle}>Log In</Link></li>
		</>
	)}
	</ul>
</nav>

	)

/* 	return (
		<nav className="navBar">
			<div className="header">
				<Link to='/' className='homeLogo'>Best Reads</Link>
			</div>
			<button onClick={handleToggle}>			
  				{navbarOpen ? (
    			<MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
  				) : (
    			<FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
  				)}
			</button>
			<div className='nav__authLinks'>
			{props.user ? (
				<>
				<ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
					<li><Link to='/' activeClassName='homebutton' onClick={toggle}>Home</Link></li>

					<li><Link to='/search' activeClassName="active-link" onClick={toggle}>Searchbook</Link></li>

					<li><Link to='/ebook/create' activeClassName='authLink' onClick={toggle}>Create an eBook</Link></li>

					<li><Link to="/auth/profile/user" activeClassName='authLink' onClick={toggle}>User page</Link></li>

					<li><Link to="/review/test" activeClassName='authLink' onClick={toggle}>Review</Link></li>

					<li><Link className='nav-logoutbtn' onClick={props.handleLogout}>Logout</Link></li>
				</ul>
				</>
				) : (
				<>
				<ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
					<li><Link to='/' 	className='authLink' onClick={toggle}>Home</Link></li>
					<li><Link to='/auth/signup' activeClassName='authLink' onClick={toggle}>Signup</Link></li>

					<li><Link to={'/auth/login'} className='authLink' onClick={toggle}>Log In</Link></li>

				</ul>
				</>
				
				)}
			</div> 
		</nav>

	); */
};



export default Navbar;

