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

  try {
    const response = await fetch(requestTokenUrl, request);
    const { access_token } = await response.json();
    if (!access_token) return alert("No Username or Invalid Password!")
    saveToken(access_token);
    return access_token;
  }catch(error) {
    if (!error.response) return alert("Internal server error! Code: 500");
    const { data } = error.response;
    if (error) alert(data);
  }
}

export async function fetchSignUp(name, username, password) {
  const signUpNewUserUrl = 'http://localhost:8080/api/v1/user';

  const requestBody = { 
    name,
    username,
    password
  };
  
  try {
    const response = await axios.post(signUpNewUserUrl, requestBody);
    console.log(response)
    const { data: { message } } = response
    alert(message);
    return response.status;
    
  }catch(error) {
    if (!error.response) return alert("Internal server error! Code: 500");
    const { data: { fields } } = error.response;
    if (error) {
      fields.forEach(({ name, message }) => {
        alert(name + " > " + message );
      });
    }
  }
}

export async function fetchAllPost() {
  const baseUrl = `http://localhost:8080/api/v1/post`;
  const token = getToken();

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

export async function fetchPostInit(text) {
  const baseUrl = `http://localhost:8080/api/v1/post`;
  const token = getToken();
  const requestHeaders = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
  };
  
  const requestBody = {
    text,
  }

  try {
    const response = await axios.post(baseUrl, requestBody, requestHeaders);
    alert(response.data.message);
  }catch(error) {
    if (!error.response) return alert('Invalid token or list not found!');
    const { data } = error.response;

    if (!data.fields) return alert(data.title)
    console.log(error.response)

    if (error) {
      data.fields.forEach(({ name, message }) => {
        alert(name + " > " + message );
      });
    }
  };

}

export async function fetchPostVotes(postId, vote) {
  const baseUrl = `http://localhost:8080/api/v1/post/${postId}/${vote}`;
  const token = getToken();
  const requestHeaders = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token
    },
  };

  try {
    await fetch(baseUrl, requestHeaders);
  }catch(error) {
    if (!error.response) return alert('Invalid token or list not found!');
    const { data } = error.response;

    if (!data.fields) return alert(data.error_description);
  };

}
