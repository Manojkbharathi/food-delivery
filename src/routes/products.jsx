import React, { useContext, useState, useEffect } from 'react';
import {
  AiFillInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import data from '../components/data.json';
import { ContextApp } from '../context/context';
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';
import Navbar from '../components/navbar';
import '../components/products.css';
import '../components/footer.css';
const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(ContextApp);

  const [id, setId] = useState('');
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setId(uid);
      } else {
        navigate('/signIn');
      }
    });
  }, [navigate]);

  const [selected, setSelected] = useState(0);
  // default selected dish is pizza
  const [selectedDish, setSelectedDish] = useState('pizza');
  //  The handleClick function is used to update the selected category and dish when a menu item is clicked.

  const handleClick = (item, key) => {
    setSelected(key);
    setSelectedDish(item);
  };

  const product = Object.getOwnPropertyNames(data);
  const [users, setUsers] = useState({ name: '', email: '' });
  const { name, email } = users;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUsers({ ...users, [name]: value });
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProduct, setFilteredProduct] = useState(product);

  useEffect(() => {
    const filteredProducts = product.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProduct(filteredProducts);
  }, [searchQuery]);

  return (
    <div className='wrapper'>
      <Navbar updateSearchQuery={setSearchQuery} />

      <div className='title'>
        <div className='menu-list-container'>
          <h2 className='slogan'>
            "Savor the Flavor, Order at <span className='clr'>Your Door.</span>"
          </h2>
          <img
            className='home-img'
            src='https://api.pizzahut.io/v1/content/en-in/in-1/images/deal/hut-meal-for-4.0e5ac94da0985f5689876da467fb694a.1.jpg'
            alt=''
          />
          <h2>Menu</h2>

          <div className='menu-list'>
            {filteredProduct.map((item, key) => (
              <div
                key={key}
                onClick={() => handleClick(item, key)}
                className={
                  selected === key ? 'item-container active' : 'item-container'
                }
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className='food'>
          <div className='pizza'>
            {data[selectedDish].map(
              (dish) =>
                (searchQuery === '' ||
                  dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  dish.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())) && (
                  <div className='pizza-img-container' key={dish.id}>
                    <div className='dish-content'>
                      <img className='pizza-img' src={dish.image} alt='' />
                      <h3 className='dish-name'>{dish.name}</h3>
                      <p>{dish.description}</p>
                      <p>
                        Spicy :
                        {dish.spicy ? (
                          <span className='red-clr'>yes</span>
                        ) : (
                          <span className='green-clr'>No</span>
                        )}
                      </p>
                      <p>
                        Vegetarian :
                        {dish.vegetarian ? (
                          <span className='green-clr'>yes</span>
                        ) : (
                          <span className='red-clr'>No</span>
                        )}
                      </p>
                      <p>Price: {dish.price}$</p>
                      <button
                        className='cart-btn'
                        onClick={() => addToCart(dish)}
                      >
                        <span>Click to get</span>
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      <footer className='footer'>
        <form
          className='form'
          action='https://formsubmit.co/manojbharathi00@gmail.com'
          method='POST'
          onChange={(event) => handleOnChange(event)}
        >
          <div>
            <input
              type='text'
              placeholder='Your Name'
              name='name'
              onChange={(event) => handleOnChange(event)}
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
              onChange={(event) => handleOnChange(event)}
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
          <a className='s-icons' href='/products'>
            <AiFillInstagram />
          </a>
          <a className='s-icons' href='/products'>
            <AiOutlineFacebook />
          </a>
          <a className='s-icons' href='/products'>
            <AiOutlineTwitter />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Products;
