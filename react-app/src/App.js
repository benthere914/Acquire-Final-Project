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
import SplashPage from './components/splashPage';
import ProductPage from './components/productPage';
import User from './components/User';
import { authenticate } from './store/session';
import SideAuth from './components/sideAuth';

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
			        <NavBar />
					<UsersList />
                    <Footer />
				</ProtectedRoute>
				<ProtectedRoute path="/users/:userId" exact={true}>
        			<NavBar />
					<User />
                    <Footer />

				</ProtectedRoute>
				<Route path="/" exact={true}>
			        <NavBar />
					<SplashPage/>
                    <Footer />
				</Route>
                <Route path='/items/:itemId'>
                    <NavBar/>
                    <ProductPage/>
                    <Footer/>
                </Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
