import axios from '../utils/axios';

export const getAllPosts = async () => {
  const { data } = await axios.get('/posts');
  return data;
};

export const getPostById = async (id: string) => {
  const { data } = await axios.get(`/posts/${id}`);
  return data;
};
