import {
  CLEAR_USER,
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
  SET_AUTH_REDIRECT_PATH
} from './types';

import axios from '../shared/axios';
import {getAxios} from '../shared/axios';
import history from '../shared/history';
import setAuthToken from '../shared/setAuthToken';
import jwt_decode from 'jwt-decode';

// const ROOT_URL = 'http://localhost:5000';
// `${ROOT_URL}/api/users/signin`

import { Route, Redirect } from 'react-router-dom';

export const signinUser = ({ email, password }) => {

  localStorage.clear();

  return dispatch => {
    getAxios()
      .post('/api/users/signin', {
        email: email,
        password: password
      })
      .then(res => {
        const { token } = res.data;

        // Set Token to the Local Strage
        localStorage.setItem('token', token);

        //setAuthToken(token);
        const decoded = jwt_decode(token);

        dispatch(setCurrentUser(decoded));

        // Redirect to somewhere
        history.push('/dashboard');
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: 'Invalid email or password'
        });
      });
  };
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: AUTH_USER,
    payload: decoded
  };
};

export const signupUser = ({ email, password }) => {
  return dispatch => {
    getAxios()
      .post('/api/users/signup', {
        email: email,
        password: password
      })
      .then(res => {
        history.push('/tempolaryentry');
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data
        });
      });
  };
};

export const resetPassword = ({ email }) => {
  return dispatch => {
    getAxios()
      .post('/api/users/reset/password', {
        email: email
      })
      .then(res => {
        history.push('/tempolaryentry');
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data
        });
      });
  };
};

export const changePassword = ({ secretToken, password }) => {
  return dispatch => {
    getAxios()
      .post('/api/users/update/password', {
        secretToken: secretToken,
        password: password
      })
      .then(res => {
        history.push('/complete-password');
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data
        });
      });
  };
};

export const signoutUser = () => {

  localStorage.clear();

  return dispatch => {

    // dispatch({
    //   type: CLEAR_USER
    // });

    localStorage.removeItem('token');
    setAuthToken(false);
  };
};

// export const fetchMessage = () => {
//   return dispatch => {
//     axios
//       .get('/api/', {
//         headers: { authorization: localStorage.getItem('token') }
//       })
//       .then(res => {
//         dispatch({
//           type: FETCH_MESSAGE,
//           payload: res.data.message
//         });
//       });
//   };
// };

export const setAuthRedirectPath = path => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const verifyEmail = secretToken => {
  return dispatch => {
    getAxios()
      .post('/api/users/verify', { secretToken: secretToken })
      .catch(err => {});
  };
};

//確認画面遷移前チェックAPI送信
export const confirmAuth = ({
  name,
  address,
  birth,
  country,
  passport,
  certificateResidence,
  picture,
  ethereumAddress,
  aml,
  terms
}) => {
  return dispatch => {
    getAxios()
      .post('/api/auth/validation', {
        name: name,
        address: address,
        birth: birth,
        country: country,
        passport: passport,
        certificateResidence: certificateResidence,
        picture: picture,
        ethereumAddress: ethereumAddress,
        aml: aml,
        terms: terms,
        userid: localStorage.getItem('userid')
      })
      .then(res => {
        dispatch({ type: AUTH_USER });
        // Set Token to the Local Strage
        localStorage.setItem('token', res.data.token);
        // Redirect to somewhere
        history.push('/feature');
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.message
        });
      });
  };
};

//確認画面遷移後の確定（登録）API送信
export const entryAuth = ({
  name,
  address,
  birth,
  country,
  passport,
  certificateResidence,
  picture,
  ethereumAddress,
  aml,
  terms
}) => {
  return dispatch => {
    getAxios()
      .post('/api/auth/insert', {
        name: name,
        address: address,
        birth: birth,
        country: country,
        passport: passport,
        certificateResidence: certificateResidence,
        picture: picture,
        ethereumAddress: ethereumAddress,
        aml: aml,
        terms: terms,
        userid: localStorage.getItem('userid')
      })
      .then(res => {
        dispatch({ type: AUTH_USER });
        // Set Token to the Local Strage
        localStorage.setItem('token', res.data.token);
        // Redirect to somewhere
        history.push('/feature');
      })
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data.message
        });
      });
  };
};
