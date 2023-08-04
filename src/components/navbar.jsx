import { Link } from 'react-router-dom';
import '../components/navbarStyle.css';
import { MdFastfood } from 'react-icons/md';
const Navbar = () => {
  return (
    <div className='navbar'>
      <Link to='/'>Home</Link>

      <Link to='signUp'>Sign Up</Link>
      <Link to='logIn'>Log In</Link>
      <Link to='cart'>
        <MdFastfood />
      </Link>
    </div>
  );
};

export default Navbar;
