import axiosBase from 'axios';
import { getURL } from './utility';

let axios = axiosBase.create({
  baseURL: getURL(),
  headers: {
    Authorization: `${localStorage.getItem('token')}`
  }
});

export default axios;

export const getAxios = () => {

  return axiosBase.create({
    baseURL: getURL(),
    headers: {
      Authorization: `${localStorage.getItem('token')}`
  }
  });
}
