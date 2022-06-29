import { Comment } from '../utils/interfaces/comment.interface';
import { UserCircleIcon } from '@heroicons/react/solid';
import { memo } from 'react';
import { HelloFromProp } from '../utils/interfaces/helloFromProp.interface';

interface SingleCommentProps extends HelloFromProp {
  comment: Comment;
}

export const SingleComment = memo(
  ({ comment, helloFromMessage }: SingleCommentProps) => {
    console.log(helloFromMessage, 'SingleComment');

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
  }
);
