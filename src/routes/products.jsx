import {
  AiFillInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
const handleLogout = async () => {
  signOut(auth)
    .then(() => {
      setUserName('Signed out successfully');
      navigate('/logIn');
    })
    .catch((err) => console.log(err.message));
};
const Products = () => {
  return (
    <div>
      Products
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
