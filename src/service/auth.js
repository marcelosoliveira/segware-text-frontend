import axios from 'axios';
import { saveToken, getToken } from '../helpers/localStorageHelper';

export async function fetchToken(username, password) {
    const requestTokenUrl = 'https://localhost:8080/oauth/token';
    // const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    // const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

    const request = {  
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
        },
        body: 'grant_type=password'
          + '&username=' + username
          + '&password=' + password,
    };
    console.log(request)
    try {
        const response = await axios.post(requestTokenUrl, request);
        const { access_token } = await response.json();
        if (access_token) {
          saveToken(access_token);
          return access_token;
        } else {
          alert('Usuário ou senha inválidos!')
        }
    }catch(error) {
        console.error(error);
    }
  }

  export async function fetchSignUp(name, username, password) {
    const signUpNewUserUrl = 'https://localhost:8080/api/v1/user';

    const request = {  
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          name,
          username,
          password
      }
    };
    console.log(request)
    try {
        const response = await axios.post(signUpNewUserUrl, request);
        if (response.status === 201) {
          return response.status;
        } else {
          alert('Erro no cadastro!')
        }
    }catch(error) {
        console.error(error);
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