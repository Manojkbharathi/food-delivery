import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
import { ContextApp } from '../context/context';
import '../components/cart.css';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
const Cart = () => {
  const { cartItem, addToCart, setCartItem } = useContext(ContextApp);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  const emptyCart = () => {
    setCartItem([]);
    Swal.fire({
      title: `Your order is successfully placed with $ ${totalAmount} `,
      showClass: {
        popup: 'animate__animated animate__fadeInDown',
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp',
      },
    });
    navigate('/products');
  };
  useEffect(() => {
    let total = 0;
    cartItem.forEach((item) => {
      total += Number(item.price * item.count);
    });
    setTotalAmount(total);
  }, [cartItem]);
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
    <div className='cart-section'>
      <Navbar />
      {cartItem.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <div className='card-wrapper'>
          {cartItem.map((item) => (
            <div key={item.id} className='cart-container'>
              <div className='cart'>
                <img className='cart-img' src={item.image} alt='' />
                <div className='details'>
                  <h3>{item.name}</h3>
                  <div className='count-section'>
                    <button className='change' onClick={() => addToCart(item)}>
                      +
                    </button>
                    <p className='count-cart'>{item.count}</p>
                    <button
                      className='change-'
                      onClick={() => removeItem(item.id)}
                    >
                      -
                    </button>
                  </div>
                  <h3>${item.price}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className='price'>Total price :${totalAmount}</h2>
      {cartItem.length > 0 ? (
        <button className='buy-button' onClick={emptyCart}>
          Buy now
        </button>
      ) : (
        <button className='buy-button' onClick={() => navigate('/products')}>
          Add item
        </button>
      )}
    </div>
  );
};

export default Cart;
