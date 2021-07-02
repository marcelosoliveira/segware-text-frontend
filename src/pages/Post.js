import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import CustomMessage from '../components/CustomMessage';
import CustomTextArea from '../components/CustomTextArea';
import CustomHeader from '../components/CustomHeader'
import { fetchPostInit } from '../service/auth';
import { getToken } from '../helpers/localStorageHelper';
import PostContext from '../context/PostContext';


export default function Post() {
  const { loading, setLoading } = useContext(PostContext);
  const [postData, setPostData] = useState(new Map());
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, [])

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setPostData(prevState => {
      return new Map(prevState).set(name, value);
    });
  }, []);

  if (!getToken()) return history.push("/login")

  const handleSubmit = async () => {
    const text = postData.get('text');
    await fetchPostInit(text);
    history.push('/home');    
  };

  if (loading) {
    return (
    <div
      style= {{ height: 500 }}
      className="ui segment"
    >
      <div className="ui active inverted dimmer">
        <div className="ui large text loader">Loading</div>
      </div>
    </div>
    );
  }    

  return (
    <div className="ui raised very padded text container segment">
      <CustomMessage>
        <Link to="/home">Back to posts</Link>
      </CustomMessage>
      <Grid
        textAlign="center"
        style={{ height: '70vh' }}
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