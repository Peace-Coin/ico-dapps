import {
  GET_PROFILE,
  GET_PROFILE_STATUS,
  PROFILE_LOADING
} from '../actions/types';

import { updateObject } from '../shared/utility';

const intialState = {
  profile: null,
  profileStatus: 0,
  loading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return updateObject(state, {
        loading: true
      });
    case GET_PROFILE:
      return updateObject(state, {
        profile: action.payload,
        loading: false
      });
    case GET_PROFILE_STATUS:
      return updateObject(state, {
        profileStatus: action.payload
      });
    default:
      return state;
  }
}
