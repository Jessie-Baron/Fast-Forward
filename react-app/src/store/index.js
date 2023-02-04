import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import fastForward from './fastForward'
import fastForwardDetails from './fastForwardDetails'
import commentReducer from './comment'
import follower from './follower'
import postLikeReducer from './likePosts';

const rootReducer = combineReducers({
  session,
  fastForward,
  fastForwardDetails,
  comment: commentReducer,
  follower,
  postLikes: postLikeReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
