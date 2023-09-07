import React, {
  createContext,
  useEffect,
  useReducer,
  useState,
  useContext,
} from 'react';
import { auth } from '../utils/firebase';
import { getUserData } from '../utils/fetchUnction';
import userReducer from '../utils/userReducer';
import { onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

const initialState = { user: null };
const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const [userEmailData, setUserEmailData] = useState('');
  const [userLogInData, setUserLogInData] = useState('');
  const fetchData = async () => {
    await getUserData().then((data) => {
      dispatch({ type: 'SET_USER_DATA', userData: data });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log('User data in state:', state.user);
  useEffect(() => {
    onAuthStateChanged(auth, (userLogInData) => {
      if (userLogInData) {
        setUserEmailData(userLogInData.providerData[0]);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={{ ...state, userEmailData, setUserLogInData }}>
      {children}
    </UserContext.Provider>
  );
};
const useStoreConsumer = () => {
  return useContext(UserContext);
};
export { StoreProvider, UserContext, useStoreConsumer };
