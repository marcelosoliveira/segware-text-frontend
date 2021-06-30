import React, { useEffect, useState } from 'react';
import { fetchUpVotes, fetchPostVotes } from '../service/auth';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const CustomHome = ({ id, text, author, upCount, downCount, createdAt }) => {
  const[votes, setVotes] = useState([]);
  const[countUp, setCountUp] = useState(0);
  const[countDown, setCountDown] = useState(0);
  const[handler, setHandler] = useState(true);
  
  const upVotes = async () => {
  const data = await fetchUpVotes();
  setVotes(data)
  }

  useEffect(() => {
    if (upCount === 0 && downCount === 0) setHandler(true);
    setCountDown(downCount);
    setCountUp(upCount)
    upVotes();
  }, [upCount, downCount]);

  const handlerClickUp = async (postId) => {
    setCountUp(countUp + 1)
    setCountDown(countDown > 0 ? countDown - 1 : 0)
    await fetchPostVotes(postId, "up");
    upVotes();
  };

  const handlerClickDown = async(postId) => {
    setCountUp(countUp > 0 ? countUp - 1 : 0)
    setCountDown(countDown + 1)
    await fetchPostVotes(postId, "down");
    upVotes();
};

  return (
    <Grid
      textAlign="center"
      style={{ height: '25vh', lineHeight: 1 }}
      verticalAlign="middle"
    >          
      <Grid.Column style={{ maxWidth: 500 }}>
        <p>{ createdAt }</p>
        <span 
          style={{ fontSize: 15, fontWeight: 600 }}
        >
          Author: { author }
        </span>
        <p 
          style={{ fontSize: 16, fontFamily: "monospace", marginTop: 10, }}
        >
          {text}
        </p>

        { votes.map(({ id: idVote, postId, upVotes: up }) => (
          <Link          
            to=""
            key={idVote}
            style={{ fontSize: 25}}
            onClick={(event) => {
                setHandler(false);
                event.preventDefault();

                if (!up) handlerClickUp(postId);                
            } }
          >
            { id === postId ? <i className={ up ? "thumbs up icon" 
            : "thumbs up outline icon" }></i> : ''  }
          </Link>          
        )) }
        <Link
            to=""
            style={{ fontSize: 25}}            
            onClick={(event) => {
              setHandler(false)
              event.preventDefault();
              handlerClickUp(id);
            } }                
            >
            {handler ? <i className="thumbs up outline icon"></i> : '' }
          </Link>
        <span 
          style={{ fontSize: 20, marginRight: 40, fontWeight: 600 }}
        >
          { countUp }
        </span>

        { votes.map(({ id: idVote, postId, downVotes: down, upVotes: up }) => (
          <Link
            to=""
            style={{ fontSize: 25}}
            key={idVote}            
            onClick={(event) => {
                setHandler(false);
                event.preventDefault();
                if (!down) handlerClickDown(postId);                
            } }
          >
            {id === postId ? <i className={ down ? "thumbs down icon" 
            : "thumbs down outline icon" }></i> : '' }
          </Link>
        )) }
          <Link
            to=""
            style={{ fontSize: 25}}            
            onClick={(event) => {
              setHandler(false)
              event.preventDefault();
              handlerClickDown(id);
            } }                
            >
            {handler ? <i className="thumbs down outline icon"></i> : '' }
          </Link>
        <span
          style={{ fontSize: 20, fontWeight: 600 }}
        >
          { countDown }
        </span>
{/*         <i class="thumbs down icon"></i>
        <i class="thumbs down outline icon"></i>
        <i class="thumbs up icon"></i>
        <i class="thumbs up outline icon"></i> */}
    </Grid.Column>
  </Grid>
  );
}

export default CustomHome;