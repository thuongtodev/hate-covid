import request from 'umi-request';
import { API_ENPOINT } from '@/utils/utils';

export async function postLogin(params) {
  return request(`${API_ENPOINT}/users/login`, {
    method: 'POST',
    data: params,
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
