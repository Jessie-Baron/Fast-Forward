import { fetchFastForwardDetails } from './fastForwardDetails';

export const LOAD_COMMENT = "comments/LOAD_COMMENTS";
export const UPDATE_COMMENT = "comments/UPDATE_COMMENTS";
export const REMOVE_COMMENT = "comments/REMOVE_COMMENTS";
export const ADD_COMMENT = "comments/ADD_COMMENTS";

export const load = (comments) => ({
  type: LOAD_COMMENT,
  comments
});


export const add = (comment) => ({
  type: ADD_COMMENT,
  comment
});

export const edit = (comment) => ({
  type: UPDATE_COMMENT,
  comment
});

export const remove = (commentId) => ({
  type: REMOVE_COMMENT,
  commentId
})



export const getComments = (fastForwardId) => async dispatch => {

  const response = await fetch(`/api/fastForwards/${fastForwardId}/comments`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const getCommentDetails = (commentId) => async dispatch => {

  const response = await fetch(`/api/comments/${commentId}`);

  if (response.ok) {
    const list = await response.json();
    dispatch(add(list));
  }
};

export const getCommentsByUser = (userId) => async dispatch => {
  const response = await fetch(`/api/artists/${userId}/comments`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  }
};

export const createComment = (fastForwardId, payload) => async dispatch => {
  console.log(payload)
  const response = await fetch(`/api/fastForwards/${fastForwardId}/comments`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  // const response = await fetch(`/api/fastForwards/${fastForwardId}/comments`, {
  //   method: "POST",
  //   headers: {

  //   }
  // })

  if (response.ok) {
    const comment = await response.json();
    dispatch(add(comment));
  }
};


export const editComment = (commentId, payload, fastForwardId) => async dispatch => {
  console.log(payload)
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (response.ok) {
    const comment = await response.json();
    console.log("this is the payload", payload)
    dispatch(add(comment));
    dispatch(fetchFastForwardDetails(fastForwardId));
  }
};


export const deleteComment = (id, fastForwardId) => async dispatch => {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const list = await response.json();
    dispatch(remove(id));
    dispatch(fetchFastForwardDetails(fastForwardId))
  }
}
const initialState = { allComments: {}, singleComment: {} };

const commentReducer = (state = initialState, action) => {
  let newState = { ...state }
  switch (action.type) {
    case LOAD_COMMENT:
      newState = { ...state, allComments: {} }
      action.comments.comments.forEach(comment => newState.allComments[comment.id] = comment)
      return newState;
    case UPDATE_COMMENT:
      newState.singleComment = action.comment
      return newState
    case ADD_COMMENT:
      newState.allComments[action.comment.id] = action.comment
      newState.singleComment = action.comment
      return newState;
    case REMOVE_COMMENT:
      newState = { ...state, allComments: { ...state.allComments }, singleComment: { ...state.singleComment } }
      delete newState.allComments[action.commentId]
      newState.singleComment = {}
      return newState
    default:
      return state;
  }
}

export default commentReducer;
