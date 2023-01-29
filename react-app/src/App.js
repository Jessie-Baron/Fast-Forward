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
import * as followActions from './store/follower'
import FollowFeed from './components/FollowFeed';
import toast, { Toaster } from 'react-hot-toast';
import TopCreators from './components/TopCreators';

function App() {

  let followings = useSelector((state) => Object.values(state.follower.following))
  followings = followings.map((user) => user.id)
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);

  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (user) {
      dispatch(followActions.followingList(user.id))
      .then(() => setIsLoaded(true))
    }
  }, [dispatch, isLoaded]);


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
              {followings && <FollowFeed />}
              {!followings.length && <TopCreators />}
            </Route>
            <Route path='/fastForwards/:fastForwardId' exact={true} >
              <FastForwardIndexItem />
            </Route>
          </Switch>
        </BrowserRouter>
      </ModalProvider>
      <Toaster />
    </div>
  );
}

export default App;
