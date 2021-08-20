import React, { useState, useEffect } from 'react';
import './style.css';
import Post from './components/Post';

/**
 * Implementation of scrollable paginated cards.
 */
export default function App(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [noData, setNoData] = useState(false);

  const requestHeaders = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  /**
   * Method to fetch posts data from API.
   */
  const populateCards = page => {
    // To enable the loading on bottom of the page until the data is fetched.
    setLoading(true);
    const fetchPosts = () => {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${page}&_limit=10`,
        requestHeaders
      )
        .then(res => res.json())
        .then(data => {
          /**
           *  update the boolean to true if no data is available further to stop   *  calling the API unnecessarily.
           */
          if (!data.length) {
            setNoData(true);
          }
          //update the post array to render the UI with cards.
          setPosts([...posts, ...data]);
          setLoading(false);
        });
    };
    fetchPosts();
  };

  //Initial call to load the posts data.
  useEffect(() => {
    populateCards(0);
  }, []);

  /**
   * Method to handle to listen the end of the page
   * and trigger the Posts API.
   */
  const handleScroll = event => {
    const target = event.target;
    /**
     * compare the height of the parent element with current height to track the end * of the screen
     */

    if (
      !noData &&
      Math.round(target.scrollHeight - target.scrollTop) === target.clientHeight
    ) {
      populateCards((page + 1) * 10);
      // Update the page number for next API call.
      setPage(page + 1);
    }
  };

  return (
    <div
      style={{
        height: '500px',
        overflowY: 'scroll',
        background: 'black'
      }}
      onScroll={e => handleScroll(e)}
    >
      <Post posts={posts} loading={loading} />
    </div>
  );
}
