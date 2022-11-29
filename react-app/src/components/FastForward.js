import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as fastForwardActions from "../store/fastForward";

const FastForwards = ({ user }) => {
    // const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const fastForwards = Object.values(useSelector((state) => state.fastForward));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fastForwardActions.fetchAllFastForwards());
    }, [dispatch]);

    return (
        <div>
            <div className="fast-forward-feed">{fastForwards?.map((fastForward) => (
                <div>
                    <div className="item-header">
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
                    <div>
                        <video className='video' controls onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} width="350" height="600" border-radius='8'>
                            <source src={fastForward.url} type="video/mp4" />
                        </video>
                    </div>
                </div>))}</div>
        </div>
    );
};

export default FastForwards;
