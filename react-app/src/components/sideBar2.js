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
                    <div className="following-text">Following</div>
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
            <div className="fixed-sideBar">
                <p className='bio'>Hey There! 👋 My name's Jessie! I'm a Full Stack Developer and the creator of this website! View, upload, edit or remove videos yourself, or interact with videos uploaded by other content creators! Want to know more about me? look below!
                </p>
                <br></br>
                👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇👇
                <h3 className='social-header' >Interested in hiring me?</h3>
                <h4 className='social-subHeader' >Let's Connect!</h4>
                <br></br>
                <br></br>
                <div className='socialsContainer'>
                    <div className='socials'>
                        <a href="https://twitter.com/CapnJessieBaron"><img className="socialIcon" id="socialIcon1" alt="" src="https://cdn-icons-png.flaticon.com/512/124/124021.png"></img></a>
                    </div>
                    <div className='socials'>
                        <a href="https://www.linkedin.com/in/jessie-baron/"><img className="socialIcon" id="socialIcon2" alt="" src="https://cdn-icons-png.flaticon.com/512/174/174857.png"></img></a>
                    </div>
                </div>
                <br></br>
                <br></br>
                <hr className='sideBar-seperator'></hr>
                <br></br>
                <h4 className='social-subHeader'>Check Out Some of My Other Work!</h4>
                <br></br>
                <br></br>
                <div className='socials'>
                    <a href="https://github.com/jbaron94"><img className="socialIcon" alt="" src="https://cdn-icons-png.flaticon.com/512/5968/5968866.png"></img></a>
                </div>
                <br></br>
                <hr className='sideBar-seperator'></hr>
                <div className='social-footer'>
                    <div>A Jessie Baron creation</div>
                    <div>inspired by TikTok</div>
                </div>
            </div>
        </div>
    )
}

export default SideBar2;
