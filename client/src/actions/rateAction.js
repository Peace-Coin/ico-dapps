import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  FETCH_MESSAGE,
  SET_AUTH_REDIRECT_PATH,
  GET_RATE
} from './types';

import axios from '../shared/axios';
import history from '../shared/history';

import { Route, Redirect } from 'react-router-dom';

// GET: Current Rate
export const getRate = (ethAmount, weiRaised, goalEth, history) => dispatch => {

  axios
    .post('/api/rate/getRate')
    .then(res => {

      let data = {
        bitcoinRate: res.data.bitcoinRate,
        usdRate: res.data.usdRate,
        ethAmount: ethAmount,
        totalEthAmount: weiRaised,
        goalEth: goalEth,
      }

      dispatch({
        type: GET_RATE,
        payload: data,

      })
    })
    .catch(err => {

      history.push('/error', err)
    });
};
