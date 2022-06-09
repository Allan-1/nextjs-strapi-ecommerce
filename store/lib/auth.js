import Router from 'next/router';
import Cookies from 'js-cookie';
import axios from 'axios';

export async function Registeruser(username, email, password) {
  const reginfo = {
    username: username,
    email: email,
    password: password,
  };
  axios
    .post('http://localhost:1337/api/auth/local/register', reginfo)
    .then((res) => {
      Cookies.set('jwt', res.data.jwt);
      Cookies.set('username', res.data.user.username);
      Router.push('/');
    })
    .catch((e) => {
      console.log(e);
    });
}

export async function loginUser(email, password) {
  const logininfo = {
    identifier: email,
    password: password,
  };
  await axios
    .post('http://localhost:1337/api/auth/local', logininfo)
    .then((res) => {
      Cookies.set('jwt', res.data.jwt);
      Cookies.set('username', res.data.user.username);
      Router.push('/');
    });
}
