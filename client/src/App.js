import React, { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import CreateBook from './pages/ebooks/CreateEbook.page';
import HomePage from './pages/Home.page';
import LogIn from './pages/authPages/LogIn.page';
import ProtectedPage from './pages/ProtectedPage';
import Search from './pages/search/Search.page';
import Signup from './pages/authPages/Signup';
import NormalRoute from './routing-components/NormalRoute';
import ProtectedRoute from './routing-components/ProtectedRoute';
import { getLoggedIn, logout } from './services/auth';
import * as CONSTS from './utils/consts';
import UserProfile from './pages/UserProfile.page';
import Test from './components/Test';

function App() {
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
					component={Signup}
				/>
				<NormalRoute
					exact
					path={'/auth/login'}
					user={user}
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
			</Switch>
		</div>
	);
}

export default App;
