import {
  createStore,
  applyMiddleware,
  Middleware,
} from 'redux';
import reduxThunk from 'redux-thunk';

import reducer from 'store/reducer';

import storeLogger from 'store/logger';

import {env} from 'configs';

//------------------------------------------------------------------------------

const middlewares: Middleware[] = [reduxThunk];

if (env.mode === 'development') middlewares.push(storeLogger);

//------------------------------------------------------------------------------

export default createStore(reducer, applyMiddleware(...middlewares));
