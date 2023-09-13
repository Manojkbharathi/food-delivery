import React, { useContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import data from '../components/data.json';
import { ContextApp } from '../context/context';
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router';
import Navbar from '../components/navbar';
import '../components/products.css';
import '../components/footer.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { advertiseItem } from '../components/data';
import Footer from '../components/footer';
import video from '../assets/video.mp4';
const Products = () => {
  window.scroll(0, 0);
  const navigate = useNavigate();
  const { addToCart } = useContext(ContextApp);
  const handleAddToCart = (dish) => {
    addToCart(dish);

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${dish.name} Added to cart successfully`,
      showConfirmButton: false,
      timer: 1000,
    });
  };

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

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProduct, setFilteredProduct] = useState(product);

  useEffect(() => {
    const filteredProducts = product.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProduct(filteredProducts);
  }, [searchQuery]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className='wrapper'>
      <Navbar updateSearchQuery={setSearchQuery} />
      <div className='video-container'>
        <video className='video' autoPlay controls width='100%'>
          <source src={video} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
      <div>
        <Slider {...settings}>
          {advertiseItem.map(({ id, img }) => {
            return (
              <div key={id}>
                <ul>
                  <li>
                    <img src={img} alt='' className='ad-img' />
                  </li>
                </ul>
              </div>
            );
          })}
        </Slider>
      </div>

      <div className='title' id='home'>
        <div className='menu-list-container'>
          <h2 className='slogan'>
            "Savor the Flavor, Order at <span className='clr'>Your Door.</span>"
          </h2>

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
                        onClick={() => handleAddToCart(dish)}
                      >
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
      <div id='contact' className=' footer-box'>
        <Footer />
      </div>
    </div>
  );
};

export default Products;
