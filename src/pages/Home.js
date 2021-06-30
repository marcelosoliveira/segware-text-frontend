import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { fetchAllPost } from '../service/auth';
import CustomMessage from '../components/CustomMessage';
import CustomHome from '../components/CustomHome';
import { getToken } from '../helpers/localStorageHelper';

export default function Home() {
  const[post, setPost] = useState([]);
  const history = useHistory();

  useEffect(() => {
    allPost();
  }, []);

  if (!getToken()) return history.push("/login")

  const allPost = async () => {
    const { content }  = await fetchAllPost();
    setPost(content);
  }

  const logoutFunction = () => {
    localStorage.clear();
  }

  return (
    <div>
      <CustomMessage>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
         <Link 
            to="/post"
            style={{ fontSize: 16 }}
          >
            Start a post? 
          </Link>
          <Link 
            to="/login"
            style={{ fontSize: 16 }}
            onClick={logoutFunction}
          >
            Logout
          </Link>
        </div>
      </CustomMessage>
      {post&&post.map(({ id, text, author, upCount, downCount, createdAt }) => (
        <div
          style={{ width: '80vh' }}
          className="ui raised very padded text container segment"
          key={id}
        >
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
