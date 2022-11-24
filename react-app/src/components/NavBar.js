
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {
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
          <input className='search-bar' type='search'>
          </input>
          <hr className="search-divider" />
          <i id="search-icon" class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className='nav-buttons'>
          <button className='upload-button'>+ Upload</button>
          <button className='login-button'><NavLink className='login' to='/login' exact={true} activeClassName='active'>Login</NavLink></button>
        </div>
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
