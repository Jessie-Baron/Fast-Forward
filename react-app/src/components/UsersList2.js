import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './User.css'

function UsersList2() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const userComponents = users?.map((user) => {
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

export default UsersList2;
