import React from 'react';
import { Link } from 'react-router-dom';
import { Routes, BrowserRouter as Router} from 'react-router-dom';

const Index = () => {
  return (
    <>
      <div className="heading-container">
        <h1 className="hero-heading bold-700">Buzz Bazaar</h1>
        <h2 className="hero-sub-heading bold-700 animated-gradient-2">
          Your Friendly, Neighborhood Campus Marketplace
        </h2>
      </div>

      <section id="features">
        <div className="feature">
          <h3 className="feature-heading">
            <i className="fa-solid fa-handshake" aria-hidden="true"></i>
            About Buzz Bazaar
          </h3>
          <div className="feature-content">
            <p>
              College-shopping burning a hole in your pocket? We got you! Buzz
              Bazaar connects you with legitimate sellers of second-hand books,
              furniture, electricals, etc. in the campus.
            </p>
          </div>
        </div>
        <div className="feature">
          <h3 className="feature-heading bold-700">
            <i className="fa-solid fa-plane-departure" aria-hidden="true"></i>
            How it works: Selling on Buzz Bazaar
          </h3>
          <div className="feature-content">
            <p>
              Upload the description of the product you are selling to our
              database. If a buyer expresses interest, you will be notified.
            </p>
          </div>
        </div>
        <div className="feature">
          <h3 className="feature-heading bold-700">
            <i className="fa-solid fa-cart-shopping"></i>
            How it works: Buying on Buzz Bazaar
          </h3>
          <div className="feature-content">
            <p>
              Look up the item you need -{'>'} Select from the diverse catalogue -{'>'}
              Save Money (Ka-Ching!)
            </p>
          </div>
        </div>
      </section>

      <section id="affirmations-generator" className="main-content">
        <h3 className="feature-heading bold-700">What are your plans</h3>
        <div className='buy-sell-form'>
          <Link to="/buy" className="sell-button" target='blank'>
            <button>Buy</button>
          </Link>
          <Link to="/sell" className="sell-button" target='blank'>
            <button>Sell</button>
          </Link>
        </div>
        <br />
      </section>
    </>
  );
};

export default Index;
