import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import * as fastForwardActions from "../store/fastForward";
import * as followActions from '../store/follower'
import './User.css'

function User() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [followsUser, setFollowsUser] = useState([]);
  const [followingUser, setFollowingUser] = useState([]);
  const fastForwardsObj = useSelector(state => state.fastForward)
  const fastForwards = Object.values(fastForwardsObj)
  const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
    dispatch(fastForwardActions.fetchAllFastForwards());
}, [dispatch, userId]);

useEffect(() => {
  if (user) {
    dispatch(followActions.followingList(userId))
    .then(() => setIsLoaded(true))
  }
}, [dispatch, isLoaded, userId, user]);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}/following`);
      const responseData = await response.json();
      setFollowsUser(Object.values(responseData));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${userId}/followers`);
      const responseData2 = await response.json();
      setFollowingUser(Object.values(responseData2));
    }
    fetchData();
  }, []);

  const filtered = fastForwards.filter(fastForward => fastForward.user_id === Number(userId))

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className='user-page-headline'>
        <div className='user-left'>
          <img className='user-profile-image' src={user.image_url} alt='profile' />
        </div>
        <div className='user-right'>
          <h2 className='profile-title'>{user.username}</h2>
          <div className='profile-subtitle'>
            {user.first_name} {user.last_name}
          </div>
        </div>
      </div>
      <div className='user-followers'>
        <div><span className='user-followers-count'>{followsUser.length}</span> following</div>
        <div><span className='user-followers-count'>{followingUser.length}</span> followers</div>
      </div>
      <div className='user-bio'>{user.bio}</div>
      <div className='video-user-wrapper'>
        {filtered.map(fastForward => (
          <video className='video' controls onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} width="200" height="300" border-radius='8'>
            <source src={fastForward.url} type="video/mp4" />
          </video>
        ))}
      </div>
    </div>
  );
}
export default User;
