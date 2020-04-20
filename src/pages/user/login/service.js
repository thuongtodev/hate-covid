import { API_ENPOINT } from '@/utils/utils';
import axios from 'axios';

export async function postLogin(params) {
  return axios({
    method: 'POST',
    url: `${API_ENPOINT}/users/login`,
    data: params,
  });
}
