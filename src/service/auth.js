import axios from 'axios';
import { saveToken, getToken } from '../helpers/localStorageHelper';

export async function fetchToken(username, password) {
    const requestTokenUrl = 'http://localhost:8080/oauth/token';
    // const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    // const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

    const requestHeader = {  
        headers: {
          authorization: 'Basic ' + Buffer.from('admin:admin').toString('base64')
        },
        body: 'grant_type=password'
          + '&username=' + username
          + '&password=' + password,
    };

    console.log(requestHeader);

    try {
        const response = await axios.post(requestTokenUrl, requestHeader);
        const { access_token } = await response.json();
          saveToken(access_token);
          return access_token;
    }catch(error) {
      const { data } = error.response;
        if (error) return alert(data.message);
    }
  }

  export async function fetchSignUp(name, username, password) {
    const signUpNewUserUrl = 'http://localhost:8080/api/v1/user';

    const requestBody = { 
          name,
          username,
          password
    };

    console.log(requestBody)
  
    try {
      const response = await axios.post(signUpNewUserUrl, requestBody);
      return response.status;
    }catch(error) {
      const { data } = error.response;
      if (error) return alert(data.message);
    }
  }

  /*  export async function fetchEventById(id) {
    const baseUrl = `https://central-errors-events.herokuapp.com/v1/events/${id}`;
    const token = getToken();
    console.log(token);
    const request = {  
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
    };
    try {
        const response = await fetch(baseUrl, request);
        if (response.status === 200) {
          return response.status;
        } else {
          alert('Erro na busca!')
        }
    }catch(error) {
        console.error(error);
    }
  } 

 /*  import axios from 'axios';
  import { saveToken } from '../helpers/localStorage';
  export default async function fetchToken(username, password) {
    const requestUserUrl = 'https://localhost:8080/oauth/token';
    const requestHeader = {
      'Content-Type': 'application/json',
    };
    const requestBody = {
      username,
      password,
    };
    try {
      const res = await axios.post(requestUserUrl, requestBody, requestHeader);
      console.log('res', res);
      const { data } = res;
      if (data) {
        saveToken(data);
        return data;
      }
    } catch (error) {
      console.error(error);
      return error.message;
    }
  } */