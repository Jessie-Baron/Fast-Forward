import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import FollowingList from './FollowList';
import LoginFormModal from './LoginFormModal';
import "./NavBar.css"
import UsersList from './UsersList';
import UsersList2 from './UsersList2';

const SideBar2 = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [forButton, setForButton] = useState(true)
    const [seeMore, setSeeMore] = useState(false)
    const [seeMore2, setSeeMore2] = useState(false)
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
                <NavLink className="sideBar-container-clicked" to="/following" exact={true}>
                    <i id='following-logo' class="fa-solid fa-people-group"></i>
                    <div className="following-text">Top Creators</div>
                </NavLink>
            </div>
            </div>
            <br />
            {!user && <h4 className='login-header'>Log in to follow creators, like videos, and view comments.</h4>}
            {!user && <div className='login-container-sidebar'>
                <LoginFormModal className='login-sideBar'nav={false}/>
            </div>
            }
            <div className='suggested-feed'>
                <h4 className='suggested-headline'>Suggested accounts</h4>
                    {!seeMore ? <UsersList /> : <UsersList2 />}
                {!seeMore && <h4 onClick={() => setSeeMore(true)} className='suggested-see-all'>See all</h4>}
                {seeMore &&<h4 onClick={() => setSeeMore(false)} className='suggested-see-all'>See less</h4>}
            </div>
            {/* {user && <div className='suggested-feed'>
                <h4 className='suggested-headline'>Followed accounts</h4>
                    <FollowingList />
                {!seeMore2 && <h4 onClick={() => setSeeMore2(true)} className='suggested-see-all'>See More</h4>}
                {seeMore2 &&<h4 onClick={() => setSeeMore2(false)} className='suggested-see-all'>See less</h4>}
            </div>} */}
        </div>
    )
}

export default SideBar2;
