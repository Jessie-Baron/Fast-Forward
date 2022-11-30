import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogout = async (e) => {
    await dispatch(logout())
    .then(history.push('/'))
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
