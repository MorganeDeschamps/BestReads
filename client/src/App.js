import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CreateEbook from './pages/ebooks/CreateEbook.page';
import LogIn from './pages/authPages/LogIn.page';
import Search from './pages/search/Search.page';
import Signup from './pages/authPages/Signup';
import NormalRoute from './routing-components/NormalRoute';
import ProtectedRoute from './routing-components/ProtectedRoute';
import { getLoggedIn, logout } from './services/auth';
import * as CONSTS from './utils/consts';
import NewDynamicShelf from './components/PrivateShelves/NewDynamicShelf'
import UserProfile from './pages/UserProfile.page';
import Test from './components/Test';
import {displayUserPage} from "./services/auth"
import BookDetails from './components/Book/BookDetails'
import "./App.css";
import HomePage from './pages/Home.page'



function App() {
/* 
 	let token = localStorage.getItem(CONSTS.ACCESS_TOKEN) || null
	let testUser;

	if(token) {
		getLoggedIn(token).then((res) => {
		console.log(res);
		if (!res.data) {
			console.log('RES IN CASE OF FAILURE', res);
			setUser(null);
		} else {
			testUser = res.data.user;
		}
	});} */

	const [user, setUser] = useState(null);
 

  	useEffect(() => {
		const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
		if (!accessToken) {
			setUser(null);
		}
		getLoggedIn(accessToken).then((res) => {
			if (!res.data) {
				console.log('RES IN CASE OF FAILURE', res);
				setUser(null);
			} else {
				setUser(res.data.user)
			}
		});
	}, []);
  
	const handleLogout = () => {
		const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
		if (!accessToken) {
			setUser(null);
		}
		logout(accessToken).then((res) => {
			if (!res.status) {
				console.error('💡 SOMETHING HAPPENED THAT HAS TO DEALT WITH', res);
			}

			localStorage.removeItem(CONSTS.ACCESS_TOKEN);
			setUser(null);
		});
	};

 	const authenticate = (user) => {
		console.log(user)
		setUser(user);
	};
 
	console.log("user: ", user)

	return (
		<div className='App'>
			<Navbar handleLogout={handleLogout} 
			component ={Navbar}
			user={user} />
			<HomePage component={HomePage}/>

			<Switch>
				<NormalRoute
					exact
					path={'/auth/signup'}
					user={user}
					authenticate={authenticate}
					component={Signup}
				/>
				<NormalRoute
					exact
					path={'/auth/login'}
					user={user}
					authenticate={authenticate}
					component={LogIn}
				/>
				<NormalRoute
					exact
					path={'/test'}
					user={user}
					component={Test}
				/>
				<NormalRoute
					exact
					path={'/details/:bookId'}
					user={user}
					component={BookDetails}
				/>
				<ProtectedRoute
					exact
					path={'/search'}
					component={Search}
					user={user}
				/>
				<ProtectedRoute
					exact
					path={`/auth/profile/user`}
					component={UserProfile}
					user={user}
					setUser={setUser}
				/>
				<ProtectedRoute
					exact
					path={'/ebook/create'}
					component={CreateEbook}
					user={user}
				/>
			</Switch>
		</div>
	);
}

export default App;
