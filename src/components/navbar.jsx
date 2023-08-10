import { Link } from 'react-router-dom';
import '../components/navbarStyle.css';
import { MdFastfood } from 'react-icons/md';
import { ContextApp } from '../context/context';
import '../index.css';
import { useContext } from 'react';
import logo from '../assets/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { FiLogOut } from 'react-icons/fi';
const Navbar = () => {
  const { cartItem } = useContext(ContextApp);
  const cartCount = cartItem.length; // Get the count of items in the cart
  const logout = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');

        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => console.log('error'));
  };
  return (
    <div className='navbar'>
      <img className='logo' src={logo} alt='' />
      <Link className='nav-link' to='/products'>
        Home
      </Link>
      <Link className='nav-link' to='/cart'>
        <span className='count'>{cartCount}</span>

        <MdFastfood />
      </Link>
      <button className='log-btn' onClick={logout}>
        <FiLogOut />
      </button>
    </div>
  );
};

export default Navbar;
