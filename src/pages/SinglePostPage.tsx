import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { SinglePost } from '../components/SinglePost';
import axios from '../utils/axios';
import { HelloFromProp } from '../utils/interfaces/helloFromProp.interface';
import { Post } from '../utils/interfaces/post.interface';

export const SinglePostPage = ({ helloFromMessage }: HelloFromProp) => {
  const [post, setPost] = useState<Post>();

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await axios.get(`/posts/${id}`);
      setPost(data);
    };

    fetchPost();
  }, []);

  console.log(helloFromMessage, SinglePostPage.name);

  return (
    <>
      <Header hasSearch={false} helloFromMessage={helloFromMessage} />

      <div className='flex flex-col justify-center items-center'>
        {post && <SinglePost post={post} helloFromMessage={helloFromMessage} />}
      </div>
    </>
  );
};
