import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import * as fastForwardActions from "../store/fastForward";
import { getComments, deleteComment } from "../store/comment";
import CommentForm from "./CommentForm";
import CommentEditForm from "./CommentEditForm";
import * as followActions from '../store/follower'
import './FastForwards.css'



const FollowButton = ({fastForward}) => {

    let followings = useSelector((state) => Object.values(state.follower.following))
    const [following, setFollowing] = useState(followings.includes(fastForward.user_id))
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    console.log("this is the value of following", following)


    useEffect(() => {
        if (user) {
          setFollowing(followings.includes(fastForward.user_id));
        }
      }, [dispatch, followings]);

      const handleFollow = (followerId, followedId) => {
        if (!following) {
            dispatch(followActions.follow(followerId, followedId))
              .then(() => setFollowing(true))
              console.log("this is whether or not the follow button worked", "followed")
          } else {
            dispatch(followActions.unfollow(followerId, followedId))
              .then(() => setFollowing(false))
              console.log("this is whether or not the follow button worked", "unfollowed")
          }
    }

      return (
        <div className={following ? "follow-button-followed" : "follow-button-unfollowed"} onClick={() => handleFollow(user.id, fastForward.User.id)}>{!following ? "Follow" : "Following"}</div>
      )
}

export default FollowButton;
