import React, { useState, useCallback } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import CustomMessage from '../components/CustomMessage';
import CustomTextArea from '../components/CustomTextArea';
import CustomHeader from '../components/CustomHeader'
import { fetchPostInit } from '../service/auth';


export default function Post() {

  const [postData, setPostData] = useState(new Map());
  const history = useHistory();

  const handleSubmit = async () => {
    const text = postData.get('text');
    const registerResponse = await fetchPostInit(text);
    if (registerResponse === 201) alert("Post created successfully"); 
    history.push('/home'); 
  };

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setPostData(prevState => {
      return new Map(prevState).set(name, value);
    });
  }, []);

  return (
    <div>
      <CustomMessage>
        <Link to="/home">Back to posts</Link>
      </CustomMessage>
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <CustomHeader message="Post a text" />
          <CustomTextArea
            postData={postData}
            onInputChange={handleInputChange}
            onHandleSubmit={handleSubmit}
          />
        </Grid.Column>
      </Grid>
    </div>
  )
}