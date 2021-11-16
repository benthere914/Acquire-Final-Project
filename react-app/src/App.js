import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LogIn from './components/login';
import SignUp from './components/signup';
import NavBar from './components/NavBar';
import Footer from './components/footer';
import AuthSwitch from './components/authSwitch';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
	const [loaded, setLoaded] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			await dispatch(authenticate());
			setLoaded(true);
		})();
	}, [dispatch]);

	if (!loaded) {
		return null;
	}

	return (
		<BrowserRouter>
			{/* <NavBar /> */}
			<Switch>
				<Route path="/login" exact={true}>
					<LogIn />
                    <AuthSwitch string={'Do you not have an account'} link='/sign-up'/>
				</Route>
				<Route path="/sign-up" exact={true}>
					<SignUp />
                    <AuthSwitch string={'Do you already have an account'} link='/login'/>
				</Route>
				<ProtectedRoute path="/users" exact={true}>
					<UsersList />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
					<User />
				</ProtectedRoute>
				<Route path="/" exact={true}>
					<h1>My Home Page</h1>
				</Route>
			</Switch>
			{/* <Footer /> */}
		</BrowserRouter>
	);
}

export default App;
