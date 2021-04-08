import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCurrentUser } from '../hooks/index';
import NavBar from '../components/NavBar'

const LoginPage = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const [user, { mutate }] = useCurrentUser();
  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.replace('/');
  }, [user]);

  async function onSubmit(e) {
    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg('Incorrect username or password. Try again!');
    }
  }

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <NavBar/>
      <div id="center">
      <h2>Sign in</h2>
      <form onSubmit={onSubmit}>
        {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : null}
        <label htmlFor="email"> <p>Email Address: </p>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email address"
          />
        </label>
        <label htmlFor="password"> <p>Password: </p>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Password"
          />
        </label>
        <br/><br/>
        <button id="submit" type="submit">Sign in</button>
      </form>
      </div>
    </>
  );
};

export default LoginPage;