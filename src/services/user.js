import axios from 'axios';

const BASE_URL = '/api/user';

export const userLogin = async (email, password) => {
  const response = await axios.post(BASE_URL, { email, password });
  return response.data;
};
