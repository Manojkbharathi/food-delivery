import {
  AiFillInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import React, { useState } from 'react';
import '../components/footer.css';
import data from '../components/data.json';
import '../components/data.json';
import '../components/products.css';

const Products = () => {
  const [selected, setSelected] = useState(0);
  const [selectedDish, setSelectedDish] = useState('pizza');
  console.log(data[selectedDish]);
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

  return (
    <div className='wrapper'>
      <div className='title'>
        <h2>Menu</h2>
        <div className='menu-list-container'>
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
                {console.log(dish)}
                <img className='pizza-img' src={dish.image} alt='' />
                <h3 className='dish-name'>{dish.name}</h3>
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
