import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as fastForwardActions from "../store/fastForward";
import { getComments, deleteComment } from "../store/comment";
import CommentForm from "./CommentForm";
import CommentEditForm from "./CommentEditForm";


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


    useEffect(() => {
        dispatch(fastForwardActions.fetchAllFastForwards());
    }, [dispatch]);

    const openMenu = () => {
        if (!showMenu) setShowMenu(true);
        if (showMenu) setShowMenu(false);
    };

    const handleDelete = async (commentId, fastForwardId) => {
        await dispatch(deleteComment(commentId, fastForwardId))
    };

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
                    <div className="video-comment">
                        <video className='video' controls onMouseOver={event => event.target.play()} onMouseOut={event => event.target.pause()} width="350" height="600" border-radius='8'>
                            <source src={fastForward.url} type="video/mp4" />
                        </video>
                        {user &&
                        <div className="video-sidebar">
                            <div onClick={openMenu} className="comment-wrapper">
                                <i id='comment-icon' class="fa-regular fa-comment"></i>
                            </div>
                            <div className="comment-counter">{fastForward?.Comments?.length}</div>
                        </div>}
                        <div className="comments">
                            {showMenu && (
                                <div className="comments-sidebar">
                                    <div className="comments-headline">
                                        <img
                                            src={fastForward.User.image_url}
                                            alt="Profile"
                                            className="profileImage">
                                        </img>
                                        <h2>{user?.username}</h2>
                                    </div>
                                    <div className="textarea-comments">
                                        <CommentForm
                                        fastForwardId={fastForward.id}/>
                                    </div>
                                    {fastForward.Comments?.map((comment) => (
                                        <div>
                                            <div className="item-header">
                                                <img
                                                    src={comment.User.image_url}
                                                    alt="Profile"
                                                    className="profileImage"
                                                ></img>
                                                <div>{comment.User.username}</div>
                                            </div>
                                            <div className="comment-body">{comment.body}</div>
                                            {comment?.user_id === user?.id && (
                                                <div className="comment-buttons">
                                                    <div
                                                        className="detailButton1"
                                                        onClick={() => handleDelete(comment.id, fastForward.id)}
                                                    >
                                                        <i class="fa-solid fa-trash"></i>
                                                    </div>
                                                    <div
                                                        id={comment.id}
                                                        value={comment.id}
                                                        className="detailButton2"
                                                        onClick={() => {
                                                            if (editId === comment.id) {
                                                                setEditId(-1);
                                                                setEditId("");
                                                                return;
                                                            }
                                                            setEditId(comment.id);
                                                            setCommentBody(comment.body);
                                                        }}
                                                    >
                                                        <i class="fa-solid fa-pen"></i>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="editform">
                                                {editId === comment.id && (
                                                    <CommentEditForm
                                                        className="comment-edit-form"
                                                        fastForwardId={fastForward.id}
                                                        comment={comment}
                                                        setCommentBody={setCommentBody}
                                                        commentBody={commentBody}
                                                        setEditId={setEditId}
                                                    />
                                                )}
                                            </div>
                                            <hr className="divider-comments" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>))}</div>
        </div>
    );
};

export default FastForwards;
