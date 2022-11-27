
import { React, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginFormModal from './LoginFormModal';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'

const NavBar = () => {

  const user = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false)

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
          <input className='search-bar' type='search'>
          </input>
          <hr className="search-divider" />
          <i id="search-icon" class="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className='nav-buttons'>
          <button className='upload-button'><NavLink className='upload' to='/upload' exact={true} activeClassName='active'>+ Upload</NavLink></button>
          {!user && <LoginFormModal className='login-button' nav={false} />}
          {user && <i id='messages' class="fa-regular fa-paper-plane"></i>}
          {user && <img onClick={openMenu} className='navbar-profile' src={user.image_url} alt='profile' />}
        </div>
        {showMenu &&
          <div className='dropdown'>
            <div className='main-menu-holder'>
              <div className='main-menu-inner'>
                <span />
                <div className='main-menu-wrapper'>
                  <ul>
                    <ul>
                      <li>
                        <div>
                          <LogoutButton />
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li>
                        <div>
                          <p>{user.username}</p>
                          <p>{user.email}</p>
                        </div>
                        <NavLink to={`/users/${user.id}`}>
                          <div>View Profile</div>
                        </NavLink>
                      </li>
                    </ul>
                  </ul>
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
