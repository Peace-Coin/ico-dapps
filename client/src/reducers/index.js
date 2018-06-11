import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducers';
import profileReducer from './profileReducers';
import errorReducer from './errorReducers';
import dashboardReducer from './dashboardReducers';

const rootReducer = combineReducers({
  form: form,
  auth: authReducer,
  profile: profileReducer,
  errors: errorReducer,
  rates: dashboardReducer
});

export default rootReducer;
