import { SearchIcon } from '@heroicons/react/solid';
import { Post } from '../utils/interfaces/post.interface';

interface HeaderProps {
  posts?: Post[];
  hasSearch: boolean;
}

export const Header = ({ posts, hasSearch }: HeaderProps) => {
  return (
    <nav className='bg-teal-500 w-full flex justify-center items-center h-16'>
      {hasSearch && (
        <div className='relative'>
          <SearchIcon className='pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-5 fill-gray-500' />

          <input
            className='center h-12 border-none rounded-md w-80'
            type='text'
            placeholder='Search'
          />
        </div>
      )}
    </nav>
  );
};
