import { API_ENPOINT } from '@/utils/utils';
import axios from 'axios';

export async function queryData() {
  return axios({
    method: 'GET',
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    url: `${API_ENPOINT}/google_accounts`,
  });
}
export async function queryLink() {
  return axios({
    method: 'GET',
    headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    url: `${API_ENPOINT}/users/link_google_drive`,
  });
}
