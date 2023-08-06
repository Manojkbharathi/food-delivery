import { Link } from 'react-router-dom';
import '../components/navbarStyle.css';
import { MdFastfood } from 'react-icons/md';
import '../index.css';
const Navbar = () => {
  return (
    <div className='navbar'>
      <Link className='nav-link' to='/'>
        Home
      </Link>

      <Link className='nav-link' to='signUp'>
        Sign Up
      </Link>
      <Link className='nav-link' to='logIn'>
        Log In
      </Link>
      <Link className='nav-link' to='cart'>
        <MdFastfood />
      </Link>
    </div>
  );
};

export default Navbar;
