import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import "./NavBar.css"

const SideBar = () => {
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

    const user = useSelector((state) => state.session.user);

    return (
        <div className='sideBar-items'>
            <div className='sideBar-buttons'>
            <div>
                <NavLink className="sideBar-container" to="/" exact={true}>
                    <i id='for-you-logo' class="fa-solid fa-house"></i>
                    <div className="for-you-text">For You</div>
                </NavLink>
            </div>
            <div>
                <NavLink className="sideBar-container" to="/" exact={true}>
                    <i id='following-logo' class="fa-solid fa-people-group"></i>
                    <div className="following-text">Following</div>
                </NavLink>
            </div>
            </div>
            <br />
            <h4 className='login-header'>Log in to follow creators, like videos, and view comments.</h4>
            <div className='login-container-sidebar'>
                <button className='login-button-sidebar'><NavLink className='login-sideBar' to='/login' exact={true} activeClassName='active'>Log In</NavLink></button>
            </div>
            <div className='suggested-feed'>
                <h4 className='suggested-headline'>Suggested accounts</h4>
                <h4 className='suggested-see-all'>See all</h4>
            </div>
        </div>
    )
}

export default SideBar;
