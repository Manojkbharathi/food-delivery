import { auth, provider } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../src/index.css';
import Home from './products';
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleCLick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem('email', data.user.email);
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error);
      });
  };
  useEffect(() => {
    setValue(localStorage.getItem('email'));
  }, []);
  const handleLogin = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setEmail('');
        setPassword('');
        setError(false);
        navigate('/signIn');
      })
      .catch((error) => {
        setError(true);
      });
  };
  return (
    <div>
      <div>
        <form onSubmit={handleLogin}>
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
      </div>
      <div className='google-auth'>
        {value ? (
          <Home />
        ) : (
          <button onClick={handleCLick}>SIgnIn with Google</button>
        )}
      </div>
    </div>
  );
};

export default SignUp;
