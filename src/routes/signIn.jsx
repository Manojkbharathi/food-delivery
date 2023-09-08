import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebase';
import '../routes/signUp';
import main from '../assets/main.jpg';
import { useStoreConsumer } from '../context/storeProvider';
const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { setUserLogInData } = useStoreConsumer();
  const [isOpen, setIsOpen] = useState(false);

  const onSignIn = async (e) => {
    e.preventDefault();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // get login data and set it tp use Store consumer
    setUserLogInData(userCredential);
    navigate('/products');
    location.reload();
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
              required
            />
            <input
              type='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
              required
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
          <div className='credential-container'>
            <button className='button' onClick={() => setIsOpen(!isOpen)}>
              Test credential
            </button>
            {isOpen && (
              <div className='credential'>
                <p>
                  <span>Email: </span>manojbharathi@gmail.com
                </p>
                <p>
                  <span>Password: </span>123456
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
