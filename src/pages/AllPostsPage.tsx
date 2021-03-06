import { useEffect, useState } from 'react';
import { Post } from '../utils/interfaces/post.interface';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SinglePost } from '../components/Post/SinglePost';
import { Header } from '../components/Header/Header';
import { HelloFromProp } from '../utils/interfaces/helloFromProp.interface';
import { getAllPosts } from '../api/PostsAPI';

export const AllPostsPage = ({ helloFromMessage }: HelloFromProp) => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [shownPosts, setShownPosts] = useState<Post[]>([]);
  const [prevIndex, setPrevIndex] = useState<number>(10);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getAllPosts();

      const firstTen = posts.slice(0, 10);
      setShownPosts(firstTen);
      setAllPosts(() => posts);
    };

    fetchPosts();
  }, []);

  const loadMore = () => {
    const firstTen = allPosts.slice(prevIndex, prevIndex + 10);
    setShownPosts(shownPosts.concat(firstTen));
    setPrevIndex(prevIndex + 10);
  };

  console.log(helloFromMessage, AllPostsPage.name);

  return (
    <>
      <Header posts={allPosts} hasSearch helloFromMessage={helloFromMessage} />

      <InfiniteScroll
        dataLength={shownPosts.length}
        next={loadMore}
        hasMore={shownPosts.length !== 100}
        loader={<>loading</>}
        className='flex flex-col justify-center items-center'
      >
        {shownPosts.map((post) => (
          <SinglePost
            key={post.id}
            post={post}
            helloFromMessage={helloFromMessage}
          />
        ))}
      </InfiniteScroll>
    </>
  );
};
