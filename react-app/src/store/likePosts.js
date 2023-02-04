import { fetchFastForwardDetails } from './fastForwardDetails';

export const LOAD_LIKE = "likes/LOAD_likeS";
export const UPDATE_LIKE = "likes/UPDATE_likeS";
export const REMOVE_LIKE = "likes/REMOVE_likeS";
export const ADD_LIKE = "likes/ADD_likeS";

export const load = (likes) => ({
  type: LOAD_LIKE,
  likes
});


export const add = (like) => ({
  type: ADD_LIKE,
  like
});

export const edit = (like) => ({
  type: UPDATE_LIKE,
  like
});

export const remove = (likeId) => ({
  type: REMOVE_LIKE,
  likeId
})



export const getLikes = (fastForwardId) => async dispatch => {

  const response = await fetch(`/api/fastForwards/${fastForwardId}/likes`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getLikeDetails = (likeId) => async dispatch => {

  const response = await fetch(`/api/likes/${likeId}`);

  if (response.ok) {
    const list = await response.json();
    dispatch(add(list));
  }
};

export const getLikesByUser = (userId) => async dispatch => {
  const response = await fetch(`/api/artists/${userId}/likes`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const createLike = (postId) => async dispatch => {
  const response = await fetch(`/api/fastForwards/${postId}/likes`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        fast_forward_id: postId
    })
  })
  // const response = await fetch(`/api/fastForwards/${fastForwardId}/likes`, {
  //   method: "POST",
  //   headers: {

  //   }
  // })

  if (response.ok) {
    const like = await response.json();
    dispatch(add(like));
  } else if (response.status < 500) {
    const data = await response.json();
    console.log(data)
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

};


export const editLike = (likeId, payload, fastForwardId) => async dispatch => {
  console.log(payload)
  const response = await fetch(`/api/likes/${likeId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const like = await response.json();
    console.log("this is the payload", payload)
    dispatch(add(like));
    dispatch(fetchFastForwardDetails(fastForwardId));
  }
};


export const deleteLike = (fastForwardId) => async dispatch => {
  const response = await fetch(`/api/likes/${fastForwardId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(remove(fastForwardId));
    dispatch(fetchFastForwardDetails(fastForwardId))
  }
}
const initialState = { allLikes: {}, singleLike: {} };

const postLikeReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_LIKE:
      newState = { ...state, allLikes: {} }
      action.likes.likes.forEach(like => newState.allLikes[like.id] = like)
      return newState;
    case UPDATE_LIKE:
      newState.singleLike = action.like
      return newState
    case ADD_LIKE:
      newState.allLikes[action.like.id] = action.like
      newState.singleLike = action.like
      return newState;
    case REMOVE_LIKE:
      newState = { ...state, allLikes: { ...state.allLikes }, singleLike: { ...state.singleLike } }
      delete newState.allLikes[action.likeId]
      newState.singleLike = {}
      return newState
    default:
      return state;
  }
}

export default postLikeReducer;
