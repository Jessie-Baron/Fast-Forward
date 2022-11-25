import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SideBar from './components/SideBar';
import FastUpload from './components/FastUpload';
import { ModalProvider } from "./context/Modal";

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
    <div className="fast-forward-body">
      <ModalProvider />
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route path='/login' exact={true}>
            <SideBar />
            <LoginForm />
          </Route>
          <Route path='/upload' exact={true}>
            <FastUpload />
          </Route>
          <Route path='/sign-up' exact={true}>
            <SideBar />
            <SignUpForm />
          </Route>
          <ProtectedRoute path='/users' exact={true} >
            <SideBar />
            <UsersList />
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <SideBar />
            <User />
          </ProtectedRoute>
          <Route path='/' exact={true} >
            <SideBar />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
