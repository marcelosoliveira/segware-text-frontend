import axios from 'axios';
import { saveToken, getToken } from '../helpers/localStorageHelper';

export async function fetchToken(username, password) {
    const requestTokenUrl = 'http://localhost:8080/oauth/token';

  const request = {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from('admin:admin').toString('base64')
    },
    body: 'grant_type=password'
      + '&username=' + username
      + '&password=' + password,
  };

console.log(request);

try {
  const response = await fetch(requestTokenUrl, request);
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

export async function fetchAllPost() {
  const baseUrl = `http://localhost:8080/api/v1/post`;
  const token = getToken();

  console.log("TOKEN=" + token);

  const request = {  
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  };

  try {
    const response = await fetch(baseUrl, request);
      return response.json();
  }catch(error) {
    if (error) return alert('Invalid token or list not found!');
  };

}

export async function fetchUpVotes() {
  const baseUrl = `http://localhost:8080/api/v1/userUpVotes`;
  const token = getToken();

  console.log("TOKEN=" + token);

  const request = {  
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  };

  try {
    const response = await fetch(baseUrl, request);
      return response.json();
  }catch(error) {
    if (error) return alert('Invalid token or list not found!');
  };

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