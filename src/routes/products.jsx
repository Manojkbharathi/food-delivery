import {
  AiFillInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import React, { useContext, useState, useEffect } from 'react';
import '../components/footer.css';
import data from '../components/data.json';
import '../components/data.json';
import '../components/products.css';
import { ContextApp } from '../context/context';

const Products = () => {
  const { addToCart, cartItem } = useContext(ContextApp);

  const [selected, setSelected] = useState(0);
  const [selectedDish, setSelectedDish] = useState('pizza');
  const handleClick = (item, key) => {
    setSelected(key);
    setSelectedDish(item);
  };
  let product = Object.getOwnPropertyNames(data);
  const [users, setUsers] = useState({ name: '', email: '' });
  const { name, email } = users;
  function handleOnchange(event) {
    const value = event.target.value;
    const key = event.target.name;
    setUsers({ ...users, [key]: value });
  }
  console.log(cartItem);
  return (
    <div className='wrapper'>
      <div className='title'>
        <div className='menu-list-container'>
          <img
            className='home-img'
            src='https://api.pizzahut.io/v1/content/en-in/in-1/images/deal/hut-meal-for-4.0e5ac94da0985f5689876da467fb694a.1.jpg'
            alt=''
          />
          <h2>Menu</h2>

          <div className='menu-list'>
            {product.map((item, key) => {
              return (
                <div
                  key={key}
                  onClick={() => handleClick(item, key)}
                  className={
                    selected === key
                      ? 'item-container active'
                      : 'item-container'
                  }
                >
                  <p>{item}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className='food'>
          <div className='pizza'>
            {data[selectedDish].map((dish) => (
              <div className='pizza-img-container' key={dish.id}>
                <div className='dish-content'>
                  <img className='pizza-img' src={dish.image} alt='' />
                  <h3 className='dish-name'>{dish.name}</h3>
                  <p>{dish.description}</p>
                  <p>
                    Spicy :{' '}
                    {dish.spicy ? (
                      <span className='red-clr'>yes</span>
                    ) : (
                      <span className='green-clr'>No</span>
                    )}
                  </p>
                  <p>
                    Vegetarian :{' '}
                    {dish.vegetarian ? (
                      <span className='green-clr'>yes</span>
                    ) : (
                      <span className='red-clr'>No</span>
                    )}
                  </p>
                  <p>Price:{dish.price}$</p>
                  <button className='cart-btn' onClick={() => addToCart(dish)}>
                    <span>Click to get </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className='footer'>
        <form
          className='form'
          action='https://formsubmit.co/manojbharathi00@gmail.com'
          method='POST'
          onChange={(event) => handleOnchange(event)}
        >
          <div>
            <input
              type='text'
              placeholder='Your Name'
              name='name'
              onChange={(event) => handleOnchange(event)}
              value={name}
              required
            />
          </div>
          <div>
            <input
              type='email'
              name='email'
              value={email}
              placeholder='Your mail id'
              onChange={(event) => handleOnchange(event)}
              required
            />
          </div>

          <div>
            <button className='btn-submit' type='submit'>
              submit
            </button>
          </div>
        </form>
        <div className='social-icons'>
          <a
            className='s-icons'
            href='https://silver-platypus-c72db6.netlify.app'
          >
            <AiFillInstagram />
          </a>
          <a
            className='s-icons'
            href='https://silver-platypus-c72db6.netlify.app'
          >
            <AiOutlineFacebook />
          </a>
          <a
            className='s-icons'
            href='https://silver-platypus-c72db6.netlify.app'
          >
            <AiOutlineTwitter />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Products;
