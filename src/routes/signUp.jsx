import { auth, provider } from '../utils/firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase';
import '../../src/index.css';
import { v4 as uuidv4 } from 'uuid';
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const handleCLick = () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        setValue(data.user.email);
        localStorage.setItem('email', data.user.email);
        navigate('/products');
      })
      .catch((error) => {
        console.error('Google Sign-In Error:', error);
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const sameId = uuidv4();
      const user = userCredential.user;
      const logInDetails = {
        signUpMethod: 'emailAndPassword',
        displayName: userName,
        // phoneNumber: number,
      };
      const userDoc = doc(db, 'users', sameId);
      await setDoc(
        userDoc,
        {
          uid: sameId,
          email: user.email,
          ...logInDetails,
        },
        { merge: true }
      );
      setEmail('');
      setPassword('');
      setError(false);
      navigate('/products');
    } catch (error) {
      console.log('Error Creating user:', error);
    }
  };
  return (
    <div className='sign-up-container'>
      <div className='heading'>
        <h1>Hungry ?</h1>
        <p>Order pizza from favorite Domino's</p>
      </div>

      <div className='sign-up'>
        <h2>Sign up</h2>
        <form onSubmit={handleLogin}>
          <input
            type='text'
            placeholder='YourName'
            onChange={(e) => setUserName(e.target.value)}
          />
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
            signUp
          </button>
          {error && <span>Wrong email or password</span>}
        </form>
      </div>
      <div className='btn-container'>
        <button className='btn' onClick={handleCLick}>
          SignIn with Google
        </button>

        <button className='btn' onClick={() => navigate('/signIn')}>
          Already have Account Log in
        </button>
      </div>
    </div>
  );
};

export default SignUp;
