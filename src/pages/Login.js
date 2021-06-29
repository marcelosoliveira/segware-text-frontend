import React, { useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import CustomLogin from '../components/CustomLogin';
import { Grid } from 'semantic-ui-react';
import CustomHeader from '../components/CustomHeader';
import { fetchToken } from '../service/auth';
import  CustomMessage from '../components/CustomMessage';

export default function Login() {
  const history = useHistory();
  const [formData, setFormData] = useState(new Map());

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData(prevState => {
      return new Map(prevState).set(name, value);
    });
  }, []);

  const handleSubmit = async () => {
    const username = formData.get('username');
    const password = formData.get('password');
    const loginResponse = await fetchToken(username, password);
    if (loginResponse) return history.push('/home')
    //history.push('/');
  }; 

    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 500 }}>
          <CustomHeader message="Segware Login" />

          <CustomLogin
            formData={formData}
            onInputChange={handleInputChange}
            onHandleSubmit={handleSubmit}
          />
          <CustomMessage>
          Already registered? <Link to="/">Sing Up</Link>
          </CustomMessage>
        </Grid.Column>
      </Grid>
    );
  }
