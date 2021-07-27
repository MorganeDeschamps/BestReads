import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CreateEbook from './pages/ebooks/CreateEbook.page';
import HomePage from './pages/Home.page';
import LogIn from './pages/authPages/LogIn.page';
import ProtectedPage from './pages/ProtectedPage';
import Search from './pages/search/Search.page';
import Signup from './pages/authPages/Signup';
import NormalRoute from './routing-components/NormalRoute';
import ProtectedRoute from './routing-components/ProtectedRoute';
import { getLoggedIn, logout } from './services/auth';
import * as CONSTS from './utils/consts';
import NewDynamicShelf from './components/PrivateShelves/NewDynamicShelf'


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
			console.log(res);
			if (!res.data) {
				console.log('RES IN CASE OF FAILURE', res);
				setUser(null);
			} else {
				setUser(res.data.user);
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
		setUser(user);
	};

	return (
		<div className='App'>
			<Navbar handleLogout={handleLogout} user={user} />

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
				<ProtectedRoute
					exact
					path={'/search'}
					component={Search}
					user={user}
				/>
				<ProtectedRoute
					exact
					path={'/user'}
					component={UserProfile}
					user={user}
				/>
				<ProtectedRoute
					exact
					path={'/ebook/create'}
					component={CreateBook}
					user={user}
				/>

				<NormalRoute exact path={'/'} component={HomePage} />
				<NormalRoute exact path={'/auth/signup'} authenticate={authenticate} component={Signup}/>
				<NormalRoute exact path={'/auth/login'} authenticate={authenticate} component={LogIn}/>
				<NormalRoute exact path={'/ebook/create'} authenticate={authenticate} component={CreateEbook} />
				<NormalRoute exact path={'/private-shelves/create'} authenticate={authenticate} component = {NewDynamicShelf} />
				<ProtectedRoute exact path={'/protected'} component={ProtectedPage} user={user} /> {/* // this means protected route has access to user prop */}
			</Switch>
		</div>
	);
}

export default App;
