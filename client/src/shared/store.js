// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk';
// import reducers from '../reducers/index';

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

// export default store;

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';
// import logger from 'redux-logger';
// import promise from 'redux-promise-middleware';

const initialState = {};

// const middleware = [promise(), thunk, logger];
const middleware = [thunk];

export const composer = () => {
  if (process.env.NODE_ENV === 'production') {
    return compose(applyMiddleware(...middleware));
  } else {
    return compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  }
};

const store = createStore(rootReducer, initialState, composer());

export default store;
