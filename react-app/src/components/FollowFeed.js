import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import './User.css'

function FollowFeed() {

    const [follows, setFollows] = useState([]);
    const user = useSelector((state) => state.session.user);
    const fastForwardsObj = useSelector(state => state.fastForward)
    const fastForwards = Object.values(fastForwardsObj)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/api/users/${user?.id}/following`);
            const responseData = await response.json();
            setFollows(Object.values(responseData));
        }
        fetchData();
    }, []);

    const filtered = []

    for (let i = 0; i < fastForwards.length; i++) {
        let fastForwardId = fastForwards[i].user_id
        for (let j = 0; j < follows.length; j++)
            if (fastForwardId === follows[j].id) filtered.push(fastForwards[i])
    }

    const userComponents = filtered?.map((fastForward) => {
        return (
            <div className='follow-feed'>
                <div className="item-header3">
                    <div className="left">
                        <img
                            src={fastForward.User.image_url}
                            alt="Profile"
                            className="profileImage"
                        />
                    </div>
                    <div className="right">
                        <div className="item-header2">
                            <div className="video-username">{fastForward.User.username}</div>
                            <div className="video-name">{fastForward.User.first_name} {fastForward.User.last_name}</div>
                        </div>
                        <div className="caption-wrapper">
                            <NavLink className="caption" to={`/fastForwards/${fastForward.id}`} exact={true}>{fastForward.caption}</NavLink>
                        </div>
                    </div>
                </div>
                <div className="video-comment">
                    <video className='video' controls onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} width="350" height="600" border-radius='8'>
                        <source src={fastForward.url} type="video/mp4" />
                    </video>
                    {user &&
                        <div className="video-sidebar">
                            <NavLink to={`/fastForwards/${fastForward?.id}`} className="comment-wrapper">
                                <i id='comment-icon' class="fa-regular fa-comment"></i>
                            </NavLink>
                            <div className="comment-counter">{fastForward?.Comments?.length}</div>
                        </div>}
                    <div className="comments">
                    </div>
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

export default FollowFeed;
