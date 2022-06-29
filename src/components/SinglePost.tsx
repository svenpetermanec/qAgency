import { memo, useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { Post } from '../utils/interfaces/post.interface';
import {
  UserCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/solid';
import { Comment } from '../utils/interfaces/comment.interface';
import axios from '../utils/axios';
import { SingleComment } from './SingleComment';
import useCollapse from 'react-collapsed';

interface SinglePostProps {
  post: Post;
}

export const SinglePost = memo(({ post }: SinglePostProps) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const { data } = await axios.get(`/posts/${post.id}/comments`);
      setComments(data);
    };

    fetchComments();
  }, []);

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

  const users = useContext(UserContext);

  const findUsernameById = (id: number) => {
    const user = users.find((user) => user.id === id);

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
        <div className='flex items-center'>
          <p className='py-1 font-medium inline align-middle'>Comments</p>
          <p className='inline ' {...getToggleProps()}>
            {isExpanded ? (
              <ChevronUpIcon className='w-6 h-6 fill-teal-500 ' />
            ) : (
              <ChevronDownIcon className='w-6 h-6 fill-teal-500' />
            )}
          </p>
        </div>
        <hr />
      </div>

      <div {...getCollapseProps()}>
        {comments.map((comment, index) => (
          <SingleComment key={index} comment={comment} />
        ))}
      </div>
    </div>
  );
});
