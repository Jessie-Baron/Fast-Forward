import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as fastForwardActions from "../store/fastForward";
import * as fastForwardDetailsActions from "../store/fastForwardDetails";
import NavBar from "./NavBar";

const FastForwards = ({ user }) => {
    // const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const fastForwards = Object.values(useSelector((state) => state.fastForward));
    console.log(fastForwards)
    const dispatch = useDispatch();


    let userFastForwards;
    if (!user) {
        history.push('/')
    } else {
        userFastForwards = fastForwards.filter((fastForward) => {
            return fastForward.User.id === user.id;
        });
    }

    useEffect(() => {
        dispatch(fastForwardActions.fetchAllFastForwards());
    }, [dispatch]);

    const fastForwardDetails = async (fastForward, e) => {
        e.preventDefault();
        await dispatch(fastForwardDetailsActions.fetchFastForwardDetails(fastForward.id));
        history.push(`/fastForwards/${fastForward.id}`);
    };

    return (
        <div>
            <div className="fast-forward-feed">{fastForwards?.map((fastForward) => (
                <div>
                    <div className="item-header">
                        <img
                            src={fastForward.User.image_url}
                            alt="Profile"
                            className="profileImage"
                        />
                        <div>{fastForward.User.username}</div>
                    </div>
                    <div className="caption">
                        {fastForward.caption}
                    </div>
                    <div>
                        <video className='video' controls autoplay width="350" height="600" border-radius='8'>
                            <source src={fastForward.url} />
                        </video>
                    </div>
                </div>))}</div>
        </div>
    );
};

export default FastForwards;
