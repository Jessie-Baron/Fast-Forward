const POST_FAST_FORWARD = "fastForwards/POST_FAST_FORWARD";
const EDIT_FAST_FORWARD = "fastForwards/EDIT_FAST_FORWARD";
const GET_FAST_FORWARD = "fastForwards/GET_FAST_FORWARD";
const DELETE_FAST_FORWARD = "fastForwards/DELETE_FAST_FORWARD"

const postFastForward = (fastForward) => ({
  type: POST_FAST_FORWARD,
  payload: fastForward,
});

const editFastForward = (fastForward) => ({
  type: EDIT_FAST_FORWARD,
  payload: fastForward
});

const getFastForwards = (fastForwards) => ({
  type: GET_FAST_FORWARD,
  payload: fastForwards,
});

const deleteFastForward = (id) => ({
  type: DELETE_FAST_FORWARD,
  payload: id
});

export const fetchAllFastForwards = () => async (dispatch) => {
  const response = await fetch("/api/fastForwards");
  if (response.ok) {
    const fastForwards = await response.json();
    dispatch(getFastForwards(fastForwards));
    return fastForwards;
  }
};

export const fetchPostFastForward = (fastForward) => async (dispatch) => {
  const { title, body } = fastForward;
  // const formData = new FormData();
  // formData.append("title", title);
  // formData.append("body", body);
  const response = await fetch("/api/fastForwards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fastForward),
  });
  if (response.ok) {
    const fastForward = await response.json();
    dispatch(postFastForward(fastForward));
    return response;
  }
};

export const fetchEditfastForward = (id, fastForward) => async (dispatch) => {
  console.log(fastForward)
  const { newTitle, newBody } = fastForward;
  // const formData = new FormData();
  // formData.append("title", newTitle);
  // formData.append("body", newBody);
  const res = await fetch(`/api/fastForwards/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(fastForward)
  });
  if (res.ok) {
    const data = await res.json()
    dispatch(editFastForward(data))
    return data
  }
}

export const fetchDeletefastForward = (id) => async (dispatch) => {
  const response = await fetch(`/api/fastForwards/${id}`, {
    method: "DELETE",
  });
  console.log(response)
  if (response.ok) {
    dispatch(deleteFastForward(id))
    return response
  }
}

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_FAST_FORWARD:
      newState = action.payload;
      return newState;
    case POST_FAST_FORWARD:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case EDIT_FAST_FORWARD:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DELETE_FAST_FORWARD:
      newState = Object.assign({}, state);
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}
