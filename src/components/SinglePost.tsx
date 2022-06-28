import { memo, useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { Post } from '../utils/interfaces/post.interface';
import { UserCircleIcon } from '@heroicons/react/solid';
import { Comment } from '../utils/interfaces/comment.interface';
import axios from '../utils/axios';

interface PostProps {
  post: Post;
}

export const SinglePost = memo(({ post }: PostProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(`/posts/${post.id}/comments`);
      setComments(data);
    };

    fetchComments();
  }, []);

  const users = useContext(UserContext);

  const findUsernameById = (id: number) => {
    const user = users.find((user) => user.id == id);

    if (user) return user.name;
  };

  return (
    <div className='bg-gray-100 m-10 p-5 rounded-md max-w-4xl '>
      <UserCircleIcon className='w-8 h-8 fill-gray-500 inline' />

      <p className='font-semibold inline'>{findUsernameById(post.userId)}</p>

      <div className='m-2'>
        <p className='font-bold'>{post.title}</p>

        {post.body}
      </div>

      <div className='m-2'>
        <hr />
        <p className='py-1 font-medium'>Comments</p>
        <hr />
      </div>

      {comments.map((comment) => (
        <>{comment.body}</>
      ))}
    </div>
  );
});
