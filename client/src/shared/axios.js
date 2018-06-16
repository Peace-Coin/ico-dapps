import axiosBase from 'axios';
import { getURL } from './utility';

const axios = axiosBase.create({
  baseURL: getURL(),
  headers: {
    Authorization: `${localStorage.getItem('token')}`
  }
});

export default axios;
