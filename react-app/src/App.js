import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import SideBar from './components/SideBar';
import SideBar2 from './components/sideBar2';
import FastUpload from './components/FastUpload';
import { ModalProvider } from "./context/Modal";
import FastForwards from './components/FastForward';
import FastForwardIndexItem from './components/FastForwardIndexItem'
import FollowFeed from './components/FollowFeed';
import TopCreators from './components/TopCreators';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);


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
      <ModalProvider>
        <BrowserRouter>
          <Switch>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path='/upload' exact={true}>
              <NavBar />
              <FastUpload />
            </Route>
            <Route path='/sign-up' exact={true}>
              <SignUpForm />
            </Route>
            <Route path='/users' exact={true} >
              <SideBar2 />
              <UsersList />
            </Route>
            <Route path='/users/:userId' exact={true} >
              <NavBar />
              <SideBar2 />
              <User />
            </Route>
            <Route path='/' exact={true} >
              <NavBar />
              <SideBar />
              <FastForwards />
            </Route>
            <Route path='/following' exact={true} >
              <NavBar />
              <SideBar2 />
              <TopCreators />
            </Route>
            <Route path='/fastForwards/:fastForwardId' exact={true} >
              <FastForwardIndexItem />
            </Route>
          </Switch>
        </BrowserRouter>
      </ModalProvider>
    </div>
  );
}

export default App;
