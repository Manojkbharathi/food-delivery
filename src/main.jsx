import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../src/routes/index.js';
import {
  ErrorPage,
  SignIn,
  Products,
  SignUp,
  Faq,
  User,
} from '../src/routes/index.js';
import Root from './routes/root.jsx';
import Cart from './routes/cart.jsx';
import Context from './context/context.jsx';
import { StoreProvider } from './context/storeProvider.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <SignUp />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'signIn',
        element: <SignIn />,
      },
      {
        path: 'faq',
        element: <Faq />,
      },
      {
        path: 'user',
        element: <User />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
      <StoreProvider>
        <RouterProvider router={router} />
      </StoreProvider>
    </Context>
  </React.StrictMode>
);
