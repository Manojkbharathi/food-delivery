import React from 'react';
import '../components/faq.css';
import Footer from '../components/footer';

const Faq = () => {
  return (
    <div className='center'>
      <h2>PIZZA CAPPERS FAQS & HELP</h2>
      <div className=' faq'>
        <h3>1.What is Contactless Delivery?</h3>
        <p>
          Contactless Delivery means that there will be no direct contact
          between customer and delivery rider. Meal will be placed in a
          pre-agreed location and avoid touching or close face to face contact.
        </p>
        <h3>2.How to do I avail contactless delivery?</h3>
        <p>
          Please opt for ‘Contactless delivery’ while placing your order online
          (web/m-site/app). Sometimes, our rider will also get in touch with you
          to understand where the pizza needs to be placed.
        </p>
        <h3>3.Can I do Cash-on-delivery for contactless delivery?</h3>
        <p>
          No, you cannot opt for cash-on-delivery. Since we are trying to make
          this entire process contactless, cash-on-delivery in this case will
          not be possible.
        </p>
        <h3>
          4. Do I have to pay extra to avail the contactless delivery service?
        </h3>
        <p>
          No, you don’t have to pay extra to avail the contactless delivery
          service.
        </p>
        <h3>5.Can I get all pizzas and other products at all stores?</h3>
        <p>
          The menu is displayed as per the availability of the menu items in the
          respective restaurant. In case certain menu items are not listed in
          the menu page, that restaurant is not serving those items. In case of
          non-availability of ordered product at a particular restaurant, the
          order will not be fulfilled. The restaurant will inform you of the
          same
        </p>
      </div>
    </div>
  );
};

export default Faq;
