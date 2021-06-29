import React, { useEffect, useState } from 'react';
import { fetchUpVotes } from '../service/auth';
import { Grid } from 'semantic-ui-react';

const CustomHome = ({ id, text, author, upCount, downCount, createdAt }) => {
  const[votes, setVotes] = useState([]);
  
  const upVotes = async () => {
  const data = await fetchUpVotes();
  setVotes(data)
  //console.log(data)
  }

  useEffect(() => {
    upVotes();
  }, []);

    const vote = votes;

  return (
    <Grid
    textAlign="center"
    style={{ height: '30vh' }}
    verticalAlign="middle"
  >          
    <Grid.Column style={{ maxWidth: 500 }}>
        <span>{ author }</span>
        <p  >
        {text}
        </p>
        {votes.map(({ id: idVote, postId, upVotes: up }) => (
          <span key={idVote}>
            {id === postId ? <i className={ up ? "thumbs up icon" 
            : "thumbs up outline icon" }></i> : '' }
          </span>
        ))}
        <i class="thumbs up outline icon"></i>
        <span>{ upCount }</span>
        {votes.map(({ id: idVote, postId, downVotes: down }) => (
          <span key={idVote}>
            {id === postId ? <i className={ down ? "thumbs down icon" 
            : "thumbs down outline icon" }></i> : '' }
          </span>
        ))}
        <i class="thumbs down outline icon"></i>
        <span>{ downCount }</span>
        <p>{ createdAt }</p>
        <br />
{/*         <i class="thumbs down icon"></i>
        <i class="thumbs down outline icon"></i>
        <i class="thumbs up icon"></i>
        <i class="thumbs up outline icon"></i> */}
    </Grid.Column>
  </Grid>
  );
}

export default CustomHome;