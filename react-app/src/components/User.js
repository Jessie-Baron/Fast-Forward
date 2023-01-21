import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams, useHistory, useLocation } from 'react-router-dom';
import * as fastForwardActions from "../store/fastForward";
import * as followActions from '../store/follower'
import './User.css'

function User() {
  const currentUser = useSelector(state => state.session.user)
  const fastForwardUserId = Number(useLocation().pathname.split("/")[2]);
  console.log("this is the user of this profile", fastForwardUserId)
  const fastForwardsObj = useSelector(state => state.fastForward)
  const fastForwards = Object.values(fastForwardsObj)
  let followings = useSelector((state) => Object.values(state.follower.following))
  followings = followings.map((user) => user.id)

  const [user, setUser] = useState({});
  const [followsUser, setFollowsUser] = useState([]);
  const [followingUser, setFollowingUser] = useState([]);
  const [following, setFollowing] = useState(followings.includes(fastForwardUserId))
  const [isLoaded, setIsLoaded] = useState(false);
  const { userId } = useParams();
  const dispatch = useDispatch();

  console.log("this is the value of followings", followings)
  console.log("this is the value of following", following)


useEffect(() => {
    dispatch(fastForwardActions.fetchAllFastForwards());
}, [dispatch, userId]);

useEffect(() => {
  if (currentUser) {
    dispatch(followActions.followingList(currentUser.id))
    .then(() => setIsLoaded(true))
  }
}, [dispatch, isLoaded, currentUser]);


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

  useEffect(() => {
    if (user) {
      setFollowing(followings.includes(fastForwardUserId));
    }
  }, [dispatch, followings]);

  const handleFollow = (followerId, followedId) => {
    if (!following) {
        dispatch(followActions.follow(followerId, followedId))
          .then(() => setFollowing(true))
          console.log("this is whether or not the follow button worked", "followed")
      } else {
        dispatch(followActions.unfollow(followerId, followedId))
          .then(() => setFollowing(false))
          console.log("this is whether or not the follow button worked", "unfollowed")
      }
}

useEffect(() => {
  if (currentUser) {
    dispatch(followActions.followingList(currentUser.id))
    .then(() => setIsLoaded(true))
  }
}, [dispatch, isLoaded]);

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
          <div>
          {currentUser && currentUser.id !== user.id && <div className={following ? "follow-button-followed-user" : "follow-button-unfollowed-user"} onClick={() => handleFollow(currentUser.id, fastForwardUserId)}>{!following ? "Follow" : "Following"}</div>}
          </div>
        </div>
      </div>
      {/* <div className='user-followers'>
        <div><span className='user-followers-count'>{followsUser.length}</span> following</div>
        <div><span className='user-followers-count'>{followingUser.length}</span> followers</div>
      </div> */}
      <div className='user-bio'>{user.bio}</div>
      <div className='video-user-wrapper'>
        {filtered.map(fastForward => (
          <div>
          <video src={fastForward.url} type="video/mp4" className='video' controls onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} width="200" height="300" border-radius='8'>
          </video>
          <NavLink to={`/fastForwards/${fastForward?.id}`} className='caption-user'>{fastForward.caption}</NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
export default User;
