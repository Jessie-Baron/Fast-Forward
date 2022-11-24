const GET_DETAILS = "fastForwardDetails/GET_DETAILS";
const DELETE_DETAILS = "fastForwardDetails/DELETE_DETAILS"
const EDIT_DETAILS = "fastForwardDetails/EDIT_DETAILS";



const getfastForwardDetails = (fastForward) => ({
  type: GET_DETAILS,
  payload: fastForward,
});

export const deletefastForwardDetails = () => ({
  type: DELETE_DETAILS
});

export const editfastForwardDetails = (fastForward) => ({
  type: EDIT_DETAILS,
  payload: fastForward
});


export const fetchfastForwardDetails = (id) => async (dispatch) => {
  const response = await fetch(`/api/stories/${id}`);
  if (response.ok) {
    const fastForward = await response.json();
    dispatch(getfastForwardDetails(fastForward));
    return response;
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_DETAILS:
      newState = action.payload;
      return newState;
    case DELETE_DETAILS:
        newState = {}
        return newState
    default:
      return state;
  }
}
