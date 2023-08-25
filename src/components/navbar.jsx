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
import { useRef } from 'react';
const Navbar = ({ updateSearchQuery }) => {
  const { cartItem } = useContext(ContextApp);
  const handleSearch = (event) => {
    updateSearchQuery(event.target.value);
  };
  const cartCount = cartItem.length; // Get the count of items in the cart
  const scrollToContact = () => {
    // Scroll to the contact section using JavaScript
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const logout = async () => {
    signOut(auth)
      .then(() => {
        navigate('/');

        localStorage.clear();
        window.location.reload();
      })
      .catch((err) => console.log('error'));
    const contactRef = useRef(null);
  };
  return (
    <div className='navbar'>
      <img className='logo' src={logo} alt='' />
      <input type='text' placeholder='Search...' onChange={handleSearch} />
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
      <a className='nav-link' href='#' onClick={scrollToContact}>
        Contact
      </a>
    </div>
  );
};

export default Navbar;
