import { Comment } from '../utils/interfaces/comment.interface';
import { UserCircleIcon } from '@heroicons/react/solid';
import { memo } from 'react';

interface SingleCommentProps {
  comment: Comment;
}

export const SingleComment = memo(({ comment }: SingleCommentProps) => {
  return (
    <div>
      <UserCircleIcon className='w-8 h-8 fill-gray-500 inline' />

      <p className='inline'>{comment.email}</p>

      <div className='m-2'>
        <p className='font-bold'>{comment.name}</p>

        <p>{comment.body}</p>
        <hr />
      </div>
    </div>
  );
});
