import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as fastForwardActions from "../store/fastForward";
import { getComments, deleteComment } from "../store/comment";
import CommentForm from "./CommentForm";
import CommentEditForm from "./CommentEditForm";
import * as followActions from '../store/follower'
import './FastForwards.css'
import FollowButton from "./FollowButton";

const FastForwards = () => {
    // const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const fastForwards = Object.values(useSelector((state) => state.fastForward));

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const commentsObj = useSelector(state => state.comment.allComments)
    const [showMenu, setShowMenu] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [commentBody, setCommentBody] = useState("");
    let followings = useSelector((state) => Object.values(state.follower.following))
    followings = followings.map((user) => user.id)



    useEffect(() => {
        dispatch(fastForwardActions.fetchAllFastForwards());
    }, [dispatch]);

    useEffect(() => {
        dispatch(followActions.followingList(user?.id));
    }, [dispatch, user?.id]);

    const handleFollow = (followerId, followedId) => {
        if (!followings.includes(followedId)) {
            dispatch(followActions.follow(followerId, followedId))
          } else {
            dispatch(followActions.unfollow(followerId, followedId))
          }
    }



    const openMenu = () => {
        if (!showMenu) setShowMenu(true);
        if (showMenu) setShowMenu(false);
    };

    const handleDelete = async (commentId, fastForwardId) => {
        await dispatch(deleteComment(commentId, fastForwardId))
        await dispatch(fastForwardActions.fetchAllFastForwards())
    };

    return (
        <div>
            <div className="fast-forward-feed">{fastForwards?.map((fastForward) => (
                <div key={fastForward.id}>
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
                                <NavLink to={`/users/${fastForward?.User?.id}`} className="video-username">{fastForward.User.username}</NavLink>
                                <div className="video-name">{fastForward.User.first_name} {fastForward.User.last_name}</div>
                            </div>
                            <div className="caption-wrapper">
                            <NavLink className="caption" to={`/fastForwards/${fastForward.id}`} exact={true}>{fastForward.caption}</NavLink>
                            </div>
                        </div>
                        {user && <div>
                            <div className={followings.includes(fastForward.User.id) ? "follow-button-followed" : "follow-button-unfollowed"} onClick={() => handleFollow(user.id, fastForward.User.id)}>{!followings.includes(fastForward.User.id) ? "Follow" : "Following"}</div>
                            </div>}
                    </div>
                    <div className="video-comment">
                        <video className='video' src={fastForward.url} type="video/mp4" controls onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} width="350" height="600" border-radius='8'>
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
                </div>))}</div>
        </div>
    );
};

export default FastForwards;
