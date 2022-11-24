const LOAD_FOLLOWING = 'followers/LOAD_FOLLOWING'
const LOAD_FOLLOWERS = 'followers/LOAD_FOLLOWERS'
const ADD_FOLLOWING = 'followers/ADD_FOLLOWING'
const REMOVE_FOLLOWING = 'followers/REMOVE_FOLLOWING'

const loadFollowing = (listOfFollowing) => ({
    type: LOAD_FOLLOWING,
    payload: listOfFollowing
})

const addFollowing = (userData) => ({
    type: ADD_FOLLOWING,
    payload: userData
})

const removeFollowing = (id) => ({
    type: REMOVE_FOLLOWING,
    payload: id
})

export const followingList = (id) => async (dispatch) => {
    const res = await fetch(`/api/users/${id}/following`)
    if (res.ok) {
        const list = await res.json()
        console.log('list', list)
        dispatch(loadFollowing(list))
        return list
    }
}

export const follow = (follower_id, followed_id) => async (dispatch) => {
    const res = await fetch('/api/followers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            follower_id,
            followed_id
        })
    })

    if (res.ok) {
        const followData = await res.json()
        console.log('followData', followData[followed_id])
        dispatch(addFollowing(followData[followed_id]))
        return followData
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occured. Please try again.']
    }
}

export const unfollow = (follower_id, followed_id) => async (dispatch) => {
    const res = await fetch('/api/followers', {
        method: 'DELETE',
        body: JSON.stringify({
            follower_id,
            followed_id
        })
    })

    if (res.ok) {
        const followData = await res.json()
        dispatch(removeFollowing(followData))
        return followData
    } else if (res.status < 500) {
        const data = await res.json()
        if (data.errors) {
            return data.errors
        }
    } else {
        return ['An error occured. Please try again.']
    }
}

const initialState = {
    followers: {},
    following: {}
}

export default function followReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case LOAD_FOLLOWING:
            newState = Object.assign({}, state);
            newState.following = { ...action.payload };
            return newState;
        case ADD_FOLLOWING:
            newState = Object.assign({}, state);
            newState.following[action.payload.id] = { ...action.payload }
            return newState
        case REMOVE_FOLLOWING:
            return {
                ...state,
                following: { ...action.payload }
            }
        default:
            return state;
    }
}
