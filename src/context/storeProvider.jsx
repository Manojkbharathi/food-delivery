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
  const getUserProfile = () => {
    const email = 'cc@gmail.com';
    const filterUser = state.user.find((item) => item.email === email);
    console.log(filterUser);
  };
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
