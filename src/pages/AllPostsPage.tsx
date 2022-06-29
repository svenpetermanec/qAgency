import { SearchIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { Post } from '../utils/interfaces/post.interface';
import axios from '../utils/axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SinglePost } from '../components/SinglePost';
import { Header } from '../components/Header';

export const AllPostsPage = () => {
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
      <Header posts={allPosts} hasSearch />

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
