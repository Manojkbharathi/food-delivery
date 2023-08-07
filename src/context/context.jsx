import { createContext, useState } from 'react';
export const ContextApp = createContext(null);
const Context = (props) => {
  const [cartItem, setCartItem] = useState([]);
  const addToCart = (dish) => {
    const extraItem = cartItem.find((item) => item.id === dish.id);
    if (extraItem) {
      setCartItem((prev) =>
        prev.map((item) =>
          item.id === dish.id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      setCartItem([...cartItem, { ...dish, count: 1 }]);
    }
  };
  const cartCount = cartItem.reduce((acc, item) => acc + item.count, 0);
  const value = { addToCart, cartItem, setCartItem, cartCount };
  return (
    <ContextApp.Provider value={value}>{props.children}</ContextApp.Provider>
  );
};

export default Context;
