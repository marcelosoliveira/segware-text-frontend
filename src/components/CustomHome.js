import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchUpVotes, fetchPostVotes, fetchUserId } from '../service/auth';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const CustomHome = ({ id, text, author, upCount, downCount, createdAt, updateCount, votes }) => {
  const[voteState, setVoteState] = useState([]);
  const[handler, setHandler] = useState(false);
  const history = useHistory();
  
  const upVotes = async () => {
  const data = await fetchUpVotes();
  if (data.status === 401) history.push("/login");
  setVoteState(data)
  }

  const requestUserId = async () => {
    const idUser = await fetchUserId();
    setHandler(true);
    votes.map(({ userId: voteUserId }) => {
      if (voteUserId === idUser) setHandler(false);
    });
  }

  useEffect(() => {
    requestUserId()
    updateCount();
    upVotes();
  }, []);

  const handlerClickUp = async (postId) => {
    const response = await fetchPostVotes(postId, "up");
    if (response.status === 401) history.push("/login");
    updateCount();
    upVotes();
  };

  const handlerClickDown = async(postId) => {
    const response = await fetchPostVotes(postId, "down");
    if (response.status === 401) history.push("/login");
    updateCount();
    upVotes();
};

  return (
    <Grid
      textAlign="center"
      style={{ lineHeight: 1 }}
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
            { id === postId ? <i className={ up ? "thumbs up icon" 
            : "thumbs up outline icon" }></i> : '' }
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
            { id === postId ? <i className={ down ? "thumbs down icon" 
            : "thumbs down outline icon" }></i> : ""}
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
            {handler ?  <i className="thumbs down outline icon"></i> : '' }
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