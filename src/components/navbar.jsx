import { Link } from 'react-router-dom';
import '../components/navbarStyle.css';
import { MdFastfood } from 'react-icons/md';
import { ContextApp } from '../context/context';
import '../index.css';
import { useContext } from 'react';

const Navbar = () => {
  const { cartItem } = useContext(ContextApp);
  const cartCount = cartItem.length; // Get the count of items in the cart

  return (
    <div className='navbar'>
      <Link className='nav-link' to='/'>
        Home
      </Link>

      <Link className='nav-link' to='signUp'>
        Sign Up
      </Link>
      <Link className='nav-link' to='signIn'>
        Sign In
      </Link>
      <Link className='nav-link' to='cart'>
        <span className='count'>{cartCount}</span>

        <MdFastfood />
      </Link>
    </div>
  );
};

export default Navbar;
