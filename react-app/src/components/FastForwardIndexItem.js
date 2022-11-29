import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams, NavLink, useHistory } from "react-router-dom";
import * as fastForwardDetailsActions from "../store/fastForwardDetails";
import * as fastForwardActions from "../store/fastForward";
// import * as followActions from '../../store/follower'
import { getComments, deleteComment } from "../store/comment";
// import CommentForm from "./CommentForm";
// import CommentEditForm from "./CommentEditForm";
import './FastForwards.css'

const FastForwardIndexItem = () => {
    const fastForwardId = Number(useLocation().pathname.split("/")[2]);
    console.log(fastForwardId)
    const [commentBody, setCommentBody] = useState("");
    const [showEdit, setShowEdit] = useState(false);
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    const fastForwards = Object.values(useSelector((state) => state.fastForward));
    const fastForward = useSelector((state) => state.fastForwardDetails);

    console.log(fastForward)

    useEffect(() => {
        dispatch(fastForwardActions.fetchAllFastForwards());
        console.log("loaded")
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            const data = await dispatch(
                fastForwardDetailsActions.fetchFastForwardDetails(fastForwardId)
            );
        })();
    }, [dispatch]);

    const handleDelete = async (commentId, fastForwardId) => {
        await dispatch(deleteComment(commentId, fastForwardId))
    };

    return (
        <div className="fastForward-wrapper">
            <video className='video-details' controls width="800" height="100%" border-radius='8'>
                <source src={fastForward.url} type="video/mp4" />
            </video>
        </div>
    )
}

export default FastForwardIndexItem
