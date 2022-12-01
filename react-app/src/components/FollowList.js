import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './User.css'

function FollowingList() {

  const [follows, setFollows] = useState([]);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/users/${user?.id}/following`);
      const responseData = await response.json();
      setFollows(Object.values(responseData));
      console.log(follows)
    }
    fetchData();
  }, []);

  const userComponents = follows?.map((user) => {
    return (
      <div className='user-suggested' key={user.id}>
        <img className='profile' src={user?.image_url} alt="user logo" />
        <div className='suggested-text'>
        <NavLink className='user-header' to={`/users/${user?.id}`}>{user.username}</NavLink>
        {user?.first_name}
        &nbsp;{user?.last_name}
        </div>
      </div>
    );
  });

  return (
    <>
      <ul>{userComponents}</ul>
    </>
  );
}

export default FollowingList;
