import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../api/PostsAPI';
import { Header } from '../components/Header/Header';
import { SinglePost } from '../components/Post/SinglePost';
import { HelloFromProp } from '../utils/interfaces/helloFromProp.interface';
import { Post } from '../utils/interfaces/post.interface';

export const SinglePostPage = ({ helloFromMessage }: HelloFromProp) => {
  const [post, setPost] = useState<Post>();

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostById(id);
      setPost(post);
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
