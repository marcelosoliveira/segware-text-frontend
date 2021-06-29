import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllPost } from '../service/auth';
import CustomMessage from '../components/CustomMessage';
import CustomHome from '../components/CustomHome';

export default function Home() {
  const[post, setPost] = useState([]);

  const allPost = async () => {
    const { content }  = await fetchAllPost();
    setPost(content);
  }

  useEffect(() => {
    allPost();
  }, []);

  return (
    <div>
      <CustomMessage>
        Start a post? <Link to="/post">Click here</Link>
      </CustomMessage>
      {post&&post.map(({ id, text, author, upCount, downCount, createdAt }) => (
        <div key={id}>
          <CustomHome 
            id={id}
            text={text}
            author={author}
            upCount={upCount}
            downCount={downCount}
            createdAt={createdAt}
          />
          
        </div>
      ))}
    </div>
  );
}
