import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { SinglePost } from '../components/SinglePost';
import axios from '../utils/axios';
import { Post } from '../utils/interfaces/post.interface';

export const SinglePostPage = () => {
  const [post, setPost] = useState<Post>();

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/posts/${id}`);
      setPost(data);
    };

    fetchPost();
  }, []);

  return (
    <>
      <Header hasSearch={false} />

      <div className='flex flex-col justify-center items-center'>
        {post && <SinglePost post={post} />}
      </div>
    </>
  );
};
