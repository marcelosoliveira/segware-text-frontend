import React, { useState, useCallback } from 'react';
import  CustomMessage from '../components/CustomMessage';
import  CustomHeader from '../components/CustomHeader';
import  CustomSignUpForm from '../components/CustomSignUpForm';
import { Grid } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import { fetchSignUp } from '../service/auth';

export default function SignUp() {
  
  const [formData, setFormData] = useState(new Map());
  const history = useHistory();

  const handleSubmit = async () => {
    const name = formData.get('name');
    const username = formData.get('username');
    const password = formData.get('password');
    const registerResponse = await fetchSignUp(name, username, password);
    if (registerResponse === 200) history.push('/login'); 
    history.push('/login'); 
  };

  const handleInputChange = useCallback(({ target: { name, value } }) => {
    setFormData(prevState => {
      return new Map(prevState).set(name, value);
    });
  }, []);

    return (
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <CustomHeader message="Segware Register" />
          <CustomSignUpForm
            formData={formData}
            onInputChange={handleInputChange}
            onHandleSubmit={handleSubmit}
          />
          <CustomMessage>
            Alaready have account? <Link to="/login">Sing In</Link>
          </CustomMessage>
        </Grid.Column>
      </Grid>
    );
}
