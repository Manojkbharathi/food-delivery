import { createContext, useContext, useReducer } from 'react';

const cart = createContext();
const CartProvider = ({ children }) => {
  return <cart.Provider>{children}</cart.Provider>;
};
const cartState = () => {
  return useContext(cart);
};
export default CartProvider;
