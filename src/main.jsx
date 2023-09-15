import React from 'react';
import ReactDOM from 'react-dom/client';
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
        element: <SignIn />,
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
        path: 'signUp',
        element: <SignUp />,
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
