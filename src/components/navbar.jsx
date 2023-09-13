import React, { useContext, useState } from 'react';
import logo from '../assets/logo.png';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { FiLogOut } from 'react-icons/fi';
import { MdFastfood } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ContextApp } from '../context/context';
import { useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import '../components/navbarStyle.css';
const Navbar = ({ updateSearchQuery }) => {
  const [isShowNavbar, setIsShowNavbar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // To control dropdown visibility
  const showNavbar = () => {
    setIsShowNavbar(true);
  };
  const closeNavbar = () => {
    setIsShowNavbar(false);
  };
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
        // Handle the logout logic
        window.location.reload();
      })
      .catch((err) => console.log('error'));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='navbar'>
      <div>
        {' '}
        <Link to='/products'>
          <img className='logo' src={logo} alt='' />
        </Link>
      </div>
      <div className='links-container'>
        <input
          className='search'
          type='text'
          placeholder='Search...'
          onChange={handleSearch}
        />
        <div>
          <Link to='/cart' className='nav-link l'>
            <span className='count'>{cartCount}</span> <MdFastfood />
          </Link>
        </div>
        <div className='dropdown'>
          <button className='dropdown-toggle' onClick={toggleDropdown}>
            Menu <FaBars />
          </button>
          {isDropdownOpen && (
            <ul className='dropdown-menu'>
              <li>
                <Link to='/products' className='nav-link'>
                  Home
                </Link>
              </li>

              <li>
                <Link to='/user' className='nav-link'>
                  Profile
                </Link>
              </li>
              <li>
                <button className='nav-link' onClick={logout}>
                  Log out
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
