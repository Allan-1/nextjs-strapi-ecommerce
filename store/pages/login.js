import { useState, useEffect } from 'react';
import style from '../styles/register.module.css';
import { loginUser } from '../lib/auth';
import Cookies from 'js-cookie';

export default function Register() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [session, setSession] = useState();

  const cookie = Cookies.get('username');
  useEffect(() => {
    setSession(cookie);
  }, []);

  function handleRegister(e) {
    e.preventDefault();
    loginUser(email, password);
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
          Login
        </button>
      </form>
    </div>
  );
}
