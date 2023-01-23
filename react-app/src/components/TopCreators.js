import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as fastForwardActions from "../store/fastForward";
import { getComments, deleteComment } from "../store/comment";
import { toast } from 'react-hot-toast';
import CommentForm from "./CommentForm";
import CommentEditForm from "./CommentEditForm";
import * as followActions from '../store/follower'
import './FastForwards.css'

const TopCreators = () => {
    // const user = useSelector((state) => state.session.user);
    const history = useHistory();
    const fastForwards = Object.values(useSelector((state) => state.fastForward));
    const sample = fastForwards.slice(13, 40)
    console.log(sample)

    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const commentsObj = useSelector(state => state.comment.allComments)
    const [showMenu, setShowMenu] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [commentBody, setCommentBody] = useState("");

    useEffect(() => {
        dispatch(fastForwardActions.fetchAllFastForwards())
        toast("You don't seem to be following anyone. Here are some of our top creators!")
    }, [dispatch]);

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
            <div className="fast-forward-feed">{sample?.map((fastForward) => (
                <div>
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

export default TopCreators;
