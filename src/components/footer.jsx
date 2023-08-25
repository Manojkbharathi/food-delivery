import { useState } from 'react';
import {
  AiFillInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { MdFastfood } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { useRef } from 'react';
const Footer = () => {
  const [users, setUsers] = useState({ name: '', email: '' });
  const { name, email } = users;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUsers({ ...users, [name]: value });
  };
  return (
    <footer className='footer' id='footer'>
      <img className='logo' src={logo} alt='' />
      <h2 className='sayings'>A slice of pizza a day keeps depression away.</h2>
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
      <div>
        <h2>Quick links</h2>
        <Link className='nav-link' to='/products'>
          Home
        </Link>
        <Link className='nav-link' to='/cart'>
          <MdFastfood />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
