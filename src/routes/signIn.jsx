import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import '../routes/signUp';
import main from '../assets/main.jpg';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const onSignIn = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.userCredential;
        setEmail('');
        setPassword('');
        setError(false);
        navigate('/products');
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div className='sign-in-container'>
      <h2>Log in with your email and password</h2>

      <div className='sing-in'>
        <div>
          <img src={main} alt='' />
        </div>
        <div>
          <form onSubmit={onSignIn}>
            <input
              type='email'
              placeholder='email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type='submit' className='button'>
              Log In
            </button>
            <button className='button' onClick={() => navigate('/')}>
              Add New account
            </button>
            {error && <span>Wrong email or password</span>}
          </form>
          {error && <span>Wrong email or password</span>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
