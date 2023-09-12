import { auth, provider } from '../utils/firebase';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { db } from '../utils/firebase';
import '../../src/index.css';
import { v4 as uuidv4 } from 'uuid';
import { useStoreConsumer } from '../context/storeProvider';
const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const sameId = uuidv4();
  const { setUserLogInData } = useStoreConsumer();
  const handleCLick = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);

      const userDoc = doc(db, 'users', user.uid);
      const userDocSnapshot = await getDoc(userDoc);
      if (userDocSnapshot.exists()) {
        setUserLogInData(user);
        navigate('/products');
        window.location.reload('/products');
      } else {
        await setDoc(userDoc, {
          id: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      }
      setUserLogInData(user);
      navigate('/products');
      window.location.reload('/products');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
          id: sameId,
          email: user.email,
          ...logInDetails,
        },
        { merge: true }
      );
      setEmail('');
      setPassword('');
      setError(false);
      navigate('/signIn');
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
