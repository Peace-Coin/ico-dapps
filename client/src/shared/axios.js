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

  console.log('getAxios token-> ')
  console.log(localStorage.getItem('token'))

  return axiosBase.create({
    baseURL: getURL(),
    headers: {
      Authorization: `${localStorage.getItem('token')}`
  }
  });
}
