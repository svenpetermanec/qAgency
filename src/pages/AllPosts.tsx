import { SearchIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Post } from '../utils/interfaces/post.interface';
import axios from './../utils/axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SinglePost } from '../components/SinglePost';

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [shownPosts, setShownPosts] = useState<Post[]>([]);
  const [prevIndex, setPrevIndex] = useState<number>(10);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('/posts');

      const firstTen = data.slice(0, 10);
      setShownPosts(firstTen);
      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  const loadMore = () => {
    const firstTen = allPosts.slice(prevIndex, prevIndex + 10);
    setShownPosts(shownPosts.concat(firstTen));
    setPrevIndex(prevIndex + 10);
  };

  return (
    <>
      <nav className='bg-teal-500 w-full flex justify-center items-center h-16'>
        <div className='relative'>
          <SearchIcon className='pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-5 fill-gray-500' />

          <input
            className='center h-12 border-none rounded-md w-80'
            type='text'
            placeholder='Search'
          />
        </div>
      </nav>

      <InfiniteScroll
        dataLength={shownPosts.length}
        next={loadMore}
        hasMore={shownPosts.length !== 100}
        loader={<>loading</>}
        className='flex flex-col justify-center items-center'
      >
        {shownPosts.map((post, index) => (
          <SinglePost key={index} post={post} />
        ))}
      </InfiniteScroll>
    </>
  );
};
