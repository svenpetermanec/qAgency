import axios from '../utils/axios';

export const getCommentsById = async (id: number) => {
  const { data } = await axios.get(`/posts/${id}/comments`);
  return data;
};
