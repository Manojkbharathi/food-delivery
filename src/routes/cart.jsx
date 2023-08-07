import React from 'react';
import { useContext, useEffect } from 'react';
import { ContextApp } from '../context/context';
import '../components/cart.css';
const Cart = () => {
  const { cartItem, addToCart, setCartItem } = useContext(ContextApp);
  useEffect(() => {});
  const removeItem = (id) => {
    const remove = cartItem.map((item) => {
      if (item.id === id && item.count > 1) {
        return {
          ...item,
          count: item.count - 1,
        };
      } else if (item.id === id && item.count <= 1) {
        return null;
      }
      return item;
    });
    const filteredItem = remove.filter((item) => item !== null);
    setCartItem(filteredItem);
  };
  return (
    <div>
      {cartItem.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div className='card-wrapper'>
          {cartItem.map((item) => (
            <div key={item.id} className='cart-container'>
              <div className='cart'>
                <img className='cart-img' src={item.image} alt='' />
                <div className='details'>
                  <p>{item.name}</p>
                  <div className='count-section'>
                    <button onClick={() => addToCart(item)}>+</button>
                    <p>{item.count}</p>
                    <button onClick={() => removeItem(item.id)}>-</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className='price'>Total price :{0}</h2>
    </div>
  );
};

export default Cart;
