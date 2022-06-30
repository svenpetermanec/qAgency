import axios from '../utils/axios';

export const getAllUsers = async () => {
  const { data } = await axios.get('/users');
  return data;
};
