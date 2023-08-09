import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
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
        navigate('/');
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div>
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

          <button type='submit'>Log In</button>
          {error && <span>Wrong email or password</span>}
        </form>
        {error && <span>Wrong email or password</span>}
      </div>
    </div>
  );
};

export default SignIn;
