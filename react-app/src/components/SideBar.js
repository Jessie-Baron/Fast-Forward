import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import "./NavBar.css"
import UsersList from './UsersList';

const SideBar = () => {
    const [showMenu, setShowMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    const [forButton, setForButton] = useState(true)
    const [followingButton, setFollowingButton] = useState(false)


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

    const forYou = () => {
        if (forButton) return
        setForButton(true)
        setFollowingButton(false)
      }

      const following = () => {
        if (followingButton) return
        setFollowingButton(true)
        setForButton(false)
      }


    const user = useSelector((state) => state.session.user);

    return (
        <div className='sideBar-items'>
            <div className='sideBar-buttons'>
            <div>
                <NavLink className={forButton ? "sideBar-container-clicked" : "sideBar-container"} to="/" exact={true}>
                    <i id='for-you-logo' class="fa-solid fa-house"></i>
                    <div className="for-you-text" onClick={forYou}>For You</div>
                </NavLink>
            </div>
            <div>
                <NavLink className={followingButton ? "sideBar-container-clicked" : "sideBar-container"} to="/" exact={true}>
                    <i id='following-logo' class="fa-solid fa-people-group"></i>
                    <div onClick={following} className="following-text">Following</div>
                </NavLink>
            </div>
            </div>
            <br />
            <h4 className='login-header'>Log in to follow creators, like videos, and view comments.</h4>
            <div className='login-container-sidebar'>
                <LoginFormModal className='login-sideBar'nav={false}/>
            </div>
            <div className='suggested-feed'>
                <h4 className='suggested-headline'>Suggested accounts</h4>
                <UsersList />
                <h4 className='suggested-see-all'>See all</h4>
            </div>
        </div>
    )
}

export default SideBar;
