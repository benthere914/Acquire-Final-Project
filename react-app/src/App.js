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
import NewProductPage from './components/newProductPage';
import EditProductPage from './components/editProductPage';
import ProfilePage from './components/profile';
import EditUserPage from './components/editUser';
import MessagesPage from './components/messagesPage';
import User from './components/User';
import SearchPage from './components/searchPage';
import SellAnotherProductPage from './components/sellSameProductPage';
import { authenticate } from './store/session';

function App() {
	const [loaded, setLoaded] = useState(false);
    const [itemSelected, setItemSelected] = useState('regular')
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
				<ProtectedRoute path="/users/:userId/edit" exact={true}>
        			<NavBar />
					<EditUserPage />
                    <Footer />
				</ProtectedRoute>
                <ProtectedRoute path="/users/:userId" exact={true}>
        			<NavBar />
					<ProfilePage itemSelected={itemSelected}/>
                    <Footer />
				</ProtectedRoute>
				<Route path="/" exact={true}>
			        <NavBar />
					<SplashPage/>
                    <Footer />
				</Route>
                <Route path='/items/new'>
                    <NavBar />
                    <NewProductPage/>
                    {/* <Footer/> */}
                </Route>
                <Route path='/items/:itemId/copy'>
                    <NavBar />
                    <SellAnotherProductPage/>
                    {/* <Footer/> */}
                </Route>
                <Route path='/items/:itemId/edit'>
                    <NavBar />
                    <EditProductPage/>
                    {/* <Footer/> */}
                </Route>
                <Route path='/items/:itemId'>
                    <NavBar/>
                    <ProductPage itemSelected={itemSelected} setItemSelected={setItemSelected}/>
                    <Footer/>
                </Route>
                <ProtectedRoute path='/messages'>
                    <NavBar/>
                    <MessagesPage/>
                    <Footer/>
                </ProtectedRoute>
                <Route path='/search/:category/:query'>
                    <NavBar/>
                    <SearchPage/>
                    <Footer/>
                </Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
