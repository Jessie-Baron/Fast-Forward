import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, NavLink, useHistory } from "react-router-dom";
import * as fastForwardDetailsActions from "../store/fastForwardDetails";
import * as fastForwardActions from "../store/fastForward";
import * as followActions from '../store/follower'
// import * as followActions from '../../store/follower'
import { getComments, deleteComment } from "../store/comment";
import CommentForm from "./CommentForm";
import CommentEditForm from "./CommentEditForm";
import './FastForwards.css'
import CaptionEditForm from "./CaptionEditForm";

const FastForwardIndexItem = () => {
    const fastForwardId = Number(useLocation().pathname.split("/")[2]);
    const user = useSelector((state) => state.session.user);
    const fastForwards = Object.values(useSelector((state) => state.fastForward));
    const fastForward = fastForwards.filter(fastForward => fastForwardId === fastForward.id)[0]
    let followings = useSelector((state) => Object.values(state.follower.following))
    followings = followings.map((user) => user.id)

    const [commentBody, setCommentBody] = useState("");
    const [captionBody, setCaptionBody] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const [showEdit2, setShowEdit2] = useState(false);
    const [editId, setEditId] = useState(-1);
    const [editId2, setEditId2] = useState(-1);
    const [following, setFollowing] = useState(followings.includes(fastForward?.User.id))
    const [isLoaded, setIsLoaded] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fastForwardActions.fetchAllFastForwards());
    }, [dispatch]);

    const deleteFastForward = async () => {
        await dispatch(fastForwardActions.fetchDeleteFastForward(fastForward.id))
            .then(history.push(`/users/${user.id}`))
    };

    const handleDelete = async (commentId, fastForwardId) => {
        await dispatch(deleteComment(commentId, fastForwardId))
        await dispatch(fastForwardActions.fetchAllFastForwards())
    };

    // const handleClick = () => {
    //     if (!following) {
    //         dispatch(followActions.follow(user.id, fastForward.user_id))
    //         // .then(() => followActions.followingList(user.id))
    //         setFollowing(true)
    //     } else {
    //         dispatch(followActions.unfollow(user.id, fastForward.user_id))
    //             // .then(() => followActions.followingList(user.id))
    //             .then(() => setFollowing(false))
    //     }
    // }

    // useEffect(() => {
    //     if (user) {
    //       dispatch(followActions.followingList(user.id))
    //       .then(() => setIsLoaded(true))
    //     }
    //   }, [dispatch, isLoaded]);

    return (
        <div className="fastForward-wrapper">
            <NavLink to='/' className='exit-redirect'><i class="fa-regular fa-circle-xmark"></i></NavLink>
            <video className='video-details' controls width='65%' height='100%' border-radius='8'>
                <source src={fastForward?.url} type="video/mp4" />
            </video>
            <div className="comments">
                <div className="comments-wrapper">
                    <div className="comments-sidebar">
                        <div className="item-wrapper">
                            <div className="item-header">
                                <div className="left">
                                    <img
                                        src={fastForward?.User.image_url}
                                        alt="Profile"
                                        className="profileImage"
                                    />
                                </div>
                                <div className="right">
                                    <div className="item-header2">
                                        <div className="video-username">{fastForward?.User?.username}</div>
                                        <div className="video-name">{fastForward?.User?.first_name} {fastForward?.User.last_name}</div>
                                    </div>
                                    <div className="caption-wrapper">
                                        <NavLink className="caption" to={`/fastForwards/${fastForward?.id}`} exact={true}>{fastForward?.caption}</NavLink>
                                    </div>
                                    {fastForward?.User?.id === user?.id &&
                                        <div className="comment-buttons">
                                            <div onClick={deleteFastForward} className="delete-button">
                                                Delete
                                            </div>
                                            <div className="edit-button"
                                                id={fastForward?.id}
                                                value={fastForward?.id}
                                                onClick={() => {
                                                    if (editId2 === fastForward?.id) {
                                                        setEditId2(-1);
                                                        setEditId2("");
                                                        return;
                                                    }
                                                    setShowEdit(!showEdit)
                                                    setEditId2(fastForward.id);
                                                    setCaptionBody(fastForward.caption);
                                                }}>
                                                Edit
                                            </div>
                                        </div>}
                                    <div className="editform">
                                        {showEdit && (
                                            <CaptionEditForm
                                                className="caption-edit-form"
                                                fastForwardId={fastForward.id}
                                                setCaptionBody={setCaptionBody}
                                                captionBody={captionBody}
                                                setShowEdit={setShowEdit}
                                            />
                                        )}
                                    </div>
                                </div>
                                {/* <div className="follow-button-holder">
                                    {user && (user?.id !== fastForward?.user_id) && (
                                        <button className={following ? "following-user-button" : "follow-user-button"} onClick={handleClick}>{following ? 'Following' : 'Follow'}</button>
                                    )}
                                </div> */}
                            </div>
                        </div>
                        <div className="scroll-body">
                            {fastForward?.Comments?.map((comment) => (
                                <div className="comment-wrapper2">
                                    <div className="item-header">
                                        <img
                                            src={comment.User.image_url}
                                            alt="Profile"
                                            className="profileImage2"
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
                                                <div className='delete-button'>Delete</div>
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
                                                <div className='edit-button'>Edit</div>
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
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
                <div className="textarea-comments">
                    <CommentForm
                        fastForwardId={fastForward?.id} />
                </div>
            </div>
        </div>
    )
}

export default FastForwardIndexItem
