
import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as fastForwardActions from "../store/fastForward";
import LoginFormModal from './LoginFormModal';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import FastForwards from './FastForward';

const NavBar = () => {

  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false)
  const [usersNav, setUsersNav] = useState([]);
  const [query, setQuery] = useState("")
  const fastForwards = Object.values(useSelector((state) => state.fastForward));

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsersNav(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(fastForwardActions.fetchAllFastForwards());
  }, [dispatch]);


  const openMenu = () => {
    if (showMenu) return
    setShowMenu(true)
    console.log("opening")
  }

  useEffect(() => {
    const closeMenu = () => {
      if (!showMenu) return
      setShowMenu(false)
      console.log("closing")
    }

    document.addEventListener("click", closeMenu)
    return () => document.removeEventListener("click", closeMenu)
  }, [showMenu])

  return (
    <nav>
      <div className="navigation-items">
        <div className="fast-forward-logo">
          <NavLink className="logo-container" to="/" exact={true}>
            <i id='home-logo' class="fa-brands fa-tiktok"></i>
            <div className="logo-text">FastForward</div>
          </NavLink>
        </div>
        <div className='search-items'>
          <div className='search-results'>
            {query && <h5 className='search-results-header'>Accounts</h5>}
             {query ? usersNav.filter(user => {
              if (query === '') {
                return user
              } else if (user.username.toLowerCase().includes(query.toLocaleLowerCase())) {
                return user
              }
            }).map((user, index) => (
              <div className='user-suggested-nav' key={user.id}>
                <img className='profile' src={user?.image_url} alt="user logo" />
                <div className='suggested-text'>
                  <NavLink className='user-header-navi' to={`/users/${user?.id}`}>{user.username}</NavLink>
                  {user?.first_name}
                  &nbsp;{user?.last_name}
                </div>
              </div>
            )) : null}
          </div>
          <input className='search-bar' type='search' onChange={event => setQuery(event.target.value)}>
          </input>
          <hr className="search-divider" />
          <i id="search-icon" class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className='nav-buttons'>
          <button className='upload-button'><NavLink className='upload' to='/upload' exact={true} activeClassName='active'>+ Upload</NavLink></button>
          {!user && <LoginFormModal className='login-button' nav={false} />}
          {/* {user && <i id='messages' class="fa-regular fa-paper-plane"></i>} */}
          {user && <img onClick={openMenu} className='navbar-profile' src={user.image_url} alt='profile' />}
        </div>
        {showMenu &&
          <div className='dropdown'>
            <div className='main-menu-holder'>
              <div className='main-menu-inner'>
                <span />
                <div className='main-menu-wrapper'>
                  <div className='dropdown-info'>
                    <p className='info-item'>{user.username}</p>
                    <p className='info-item'>{user.first_name} {user.last_name}</p>
                    <p className='info-item'>{user.email}</p>
                  </div>
                  <hr className='dropdown-divider' />
                  <div className='dropdown-links'>
                    <NavLink className='dropdown-link-item' to={`/users/${user.id}`}>
                      <div>View Profile</div>
                    </NavLink>
                    <NavLink className='dropdown-link-item' to='/following'>
                      <div>Top Creators</div>
                    </NavLink>
                    <div className='dropdown-link-item'>
                      <LogoutButton />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {/* <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul> */}
      </div>
    </nav>
  );
}

export default NavBar;
