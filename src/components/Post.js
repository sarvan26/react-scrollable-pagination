import React from 'react';
import './style';

/**
 * Implementation of posts card.
 */
export default function Post({ posts, loading }) {
  return (
    <ul
      className="list-group mb-4 post_group"
      style={{
        padding: '1rem',
        listStyle: 'none'
      }}
    >
      {posts.map(post => (
        <li
          style={{
            border: '3px',
            padding: '1rem',
            marginTop: '10px',
            borderRadius: '10px',
            background: 'linear-gradient(110deg, #fdcd3b 60%, #ffed4b 60%)'
          }}
          key={post.id}
          className="list-group-item post_group_list"
        >
          <h2> {`(${post.id}) ${post.title}`}</h2>
          {post.body}
        </li>
      ))}
      {loading && <li className="post_group_last_element" />}
    </ul>
  );
}
