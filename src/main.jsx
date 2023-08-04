import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../src/routes/index.js';
import { ErrorPage, LogIn, Products, SignUp } from '../src/routes/index.js';
import Root from './routes/root.jsx';
import Cart from './routes/cart.jsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Products />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'logIn',
        element: <LogIn />,
      },
      {
        path: 'signUp',
        element: <SignUp />,
      },
    ],
  },

  // {
  //   path: 'signUp',
  //   element: <SignUp />,
  // },
  //
  // {
  //   path: 'logIn',
  //   element: <LogIn />,
  // },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
