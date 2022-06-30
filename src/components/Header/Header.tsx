import { SearchIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelloFromProp } from '../../utils/interfaces/helloFromProp.interface';
import { Post } from '../../utils/interfaces/post.interface';

interface HeaderProps extends HelloFromProp {
  posts?: Post[];
  hasSearch: boolean;
}

export const Header = ({ posts, hasSearch, helloFromMessage }: HeaderProps) => {
  const [filteredPosts, setFilteredPosts] = useState<Post[] | undefined>([]);

  const navigate = useNavigate();

  const search = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === '') return setFilteredPosts([]);

    const regex = new RegExp(`${e.target.value}`, 'gi');

    const postsFilteredArray = posts?.filter((post) => {
      return regex.test(post.title) || regex.test(post.body);
    });
    setFilteredPosts(postsFilteredArray);
  };

  console.log(helloFromMessage, Header.name);

  return (
    <nav className='bg-teal-500 w-full flex justify-center items-center h-16'>
      {hasSearch && (
        <div className='relative'>
          <SearchIcon className='pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-5 fill-gray-500' />

          <input
            className='center h-12 border-none rounded-md w-80'
            type='text'
            placeholder='Search'
            onChange={search}
          />

          <div className='absolute mt-3 rounded-md bg-teal-500 text-white max-h-52 min-w-full overflow-auto'>
            {filteredPosts?.map((post) => (
              <p
                key={post.id}
                onClick={() => navigate(`/post/${post.id}`)}
                className='hover:bg-teal-600 rounded-md p-2 cursor-pointer'
              >
                {post.title}
              </p>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
