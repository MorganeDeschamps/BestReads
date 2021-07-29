import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import './Navbar.css';


const Navbar = (props) => {
	const {user} = props
	const [navbarOpen, setNavbarOpen] = useState(false)
	const handleToggle = () => {
		setNavbarOpen(prev => !prev)
	}
	const closeMenu = () => {
		setNavbarOpen(false)
	}

	return (
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
					<li><Link to='/' activeClassName='homebutton' onClick={() => closeMenu()}>Home</Link></li>

					<li><Link to='/search' activeClassName="active-link" onClick={() => closeMenu()}>Searchbook</Link></li>

					<li><Link to='/ebook/create' activeClassName='authLink' onClick={() => closeMenu()}>Create an eBook</Link></li>

					<li><Link to="/auth/profile/user" activeClassName='authLink' onClick={() => closeMenu()}>User page</Link></li>

					<li><Link to="/review/test" activeClassName='authLink' onClick={() => closeMenu()}>Review</Link></li>

					<li><Link className='nav-logoutbtn' onClick={props.handleLogout}>Logout</Link></li>
				</ul>
				</>
				) : (
				<>
				<ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
					<li><Link to='/' 	className='authLink' onClick={() => closeMenu()}>Home</Link></li>
					<li><Link to='/auth/signup' activeClassName='authLink' onClick={() => closeMenu()}>Signup</Link></li>

					<li><Link to='/auth/login' className='authLink' onClick={() => closeMenu()}>Log In</Link></li>

				</ul>
				</>
				
				)}
			</div> 
		</nav>
		
			

				
			
			
			
		
			

		

	);
};



export default Navbar;

