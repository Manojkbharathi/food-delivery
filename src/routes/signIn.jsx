import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useState, useEffect } from 'react';
import Home from './products';
const SignIn = () => {
  const [value, setValue] = useState('');
  const handleCLick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      localStorage.setItem('email', data.user.email);
    });
  };
  useEffect(() => {
    setValue(localStorage.getItem('email'));
  });
  return (
    <div>
      {value ? (
        <Home />
      ) : (
        <button onClick={handleCLick}>SIgnIn with Google</button>
      )}
    </div>
  );
};

export default SignIn;
