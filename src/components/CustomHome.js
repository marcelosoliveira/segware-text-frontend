import React, { useEffect, useState } from 'react';
import { fetchUpVotes, fetchPostVotes } from '../service/auth';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const CustomHome = ({ id, text, author, upCount, downCount, createdAt, updateCount, votes }) => {
  const[voteState, setVoteState] = useState([]);
  const[handler, setHandler] = useState(false);
  
  const upVotes = async () => {
  const data = await fetchUpVotes();
  setVoteState(data)
  }

  useEffect(() => {
    /* if (votes.length === 0) */ setHandler(true);
    updateCount();
    upVotes();
  }, []);

  const handlerClickUp = async (postId) => {
    await fetchPostVotes(postId, "up");
    updateCount();
    upVotes();
  };

  const handlerClickDown = async(postId) => {
    await fetchPostVotes(postId, "down");
    updateCount();
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
          style={{ fontSize: 16, fontFamily: "monospace", marginTop: 10 }}
        >
          {text}
        </p>

        { voteState&&voteState.map(({ id: idVote, postId, upVotes: up }) => (
          <Link          
            to=""
            key={idVote}
            style={{ fontSize: 25}}
            onClick={(event) => {
              event.preventDefault();
              if (!up) handlerClickUp(postId);                
            } }
          >
            { id === postId && !handler ? <i className={ up ? "thumbs up icon" 
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
          { upCount }
        </span>


        { voteState&&voteState.map(({ id: idVote, postId, downVotes: down, upVotes: up }) => (
          <Link
            to=""
            style={{ fontSize: 25}}
            key={idVote}            
            onClick={(event) => {
              event.preventDefault();
              if (!down) handlerClickDown(postId);                
            } }
          >
            {id === postId && !handler ? <i className={ down ? "thumbs down icon" 
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
          { downCount }
        </span>
    </Grid.Column>
  </Grid>
  );
}

export default CustomHome;