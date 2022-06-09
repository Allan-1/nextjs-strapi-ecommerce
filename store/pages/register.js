import Router from 'next/router';
import { useState, useEffect } from 'react';
import style from '../styles/register.module.css';
import { Registeruser } from '../lib/auth';
import Cookies from 'js-cookie';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [session, setSession] = useState();

  const cookie = Cookies.get('username');
  useEffect(() => {
    setSession(cookie);
  }, []);

  function handleRegister(e) {
    e.preventDefault();
    Registeruser(username, email, password);
  }
  return session ? (
    <div>User already Logged in</div>
  ) : (
    <div className={style.register}>
      <h5>AmuTech</h5>
      <form onSubmit={handleRegister} className={style.regform}>
        <input
          className={style.reginput}
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          className={style.reginput}
          type="text"
          placeholder="Enter your Email address"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className={style.reginput}
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit" className={style.button}>
          Register
        </button>
      </form>
    </div>
  );
}
