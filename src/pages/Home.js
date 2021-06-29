import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { fetchAllPost, fetchUpVotes } from '../service/auth';
import CustomMessage from '../components/CustomMessage';

export default function Home() {
  const[post, setPost] = useState([]);
  const[votes, setVotes] = useState([]);

  const allPost = async () => {
    const { content }  = await fetchAllPost();
    setPost(content);
    //console.log(content);
  }

  const upVotes = async () => {
    const data = await fetchUpVotes();
    setVotes(data)
    console.log(data)
  }

  useEffect(() => {
    allPost();
    upVotes();
  }, []);

  const [vote] = votes;
  console.log(vote)

  return (
    <div>
      <CustomMessage>
      Start a post? <Link to="/post">Click here</Link>
      </CustomMessage>
      {post&&post.map(({ id, text, author, upCount, downCount }) => (
        <div key={id}>
          <span>{ author }</span>
          <p  >
            {text}
          </p>
          <span>{votes[id] ? 'upVotes' : false}</span>
          <span>{ upCount }</span>

          <span>      </span>

          <span>{votes[id] ? 'downVotes' : false}</span>
          <span>{ downCount }</span>
        </div>
      ))}
    </div>
  );
}
