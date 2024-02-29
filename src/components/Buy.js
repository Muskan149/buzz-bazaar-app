import React, { useEffect, useState, useContext } from 'react';
import { SessionContext } from './AuthProvider';
import { supabase } from '../js/supabaseConfig.js';
import useProductInfo from '../js/useProductInfo.js';
import ProductCard from './ProductCard.js';

const Buy = () => {
  const session = useContext(SessionContext);

  // State to store data retrieved from Supabase
  const [data, setData] = useState([]);
  const { productInfoData, errorFetchingData, handleRetrieveData } = useProductInfo();

  const loginAlert = () => {
    alert("You gotta login first");
  }

  useEffect(() => {
    try {
      if (!errorFetchingData) {
        console.log(Object.entries(productInfoData))
        setData(productInfoData)
      }
    } catch (errorFetchingData) {
      console.error('Error fetching product data:', errorFetchingData);
    }
  }, [productInfoData]); // Empty dependency array ensures the effect runs once after the component mounts

  useEffect(() => {
    // Function to filter products
    function filterProducts() {
      console.log("started detecting");
      const selectedCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
      let input = inputField.value.toLowerCase();

      const cardBodies = document.getElementsByClassName('row justify-content-center mb-3');
      const productTypes = document.getElementsByClassName('product-type');
      const productNames = document.getElementsByClassName('product-name');

      if (input.length > 0 && selectedCategories.length > 0) {
        for (let i = 0; i < cardBodies.length; i++) {
          if (selectedCategories.includes(productTypes[i].textContent) && productNames[i].innerHTML.toLowerCase().includes(input)) {
            cardBodies[i].style.display = "flex";
          } else {
            cardBodies[i].style.display = "none";
          }
        }
      } else if (input.length === 0 && selectedCategories.length === 0) {
        for (let i = 0; i < cardBodies.length; i++) {
          cardBodies[i].style.display = "flex";
        }
      } else {
        if (input.length > 0) {
          for (let i = 0; i < cardBodies.length; i++) {
            if (productNames[i].innerHTML.toLowerCase().includes(input)) {
              cardBodies[i].style.display = "flex";
            } else {
              cardBodies[i].style.display = "none";
            }
          }
        } else {
          for (let i = 0; i < cardBodies.length; i++) {
            if (selectedCategories.includes(productTypes[i].textContent)) {
              cardBodies[i].style.display = "flex";
            } else {
              cardBodies[i].style.display = "none";
            }
          }
        }
      }
    }

    // Event listeners
    const checkboxes = document.querySelectorAll('.form-check-input');
    const inputField = document.getElementById('search-input');

    if (inputField && checkboxes) {
      inputField.addEventListener('input', filterProducts);
      checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', filterProducts);
      });
    } else {
      console.log("Don't exist");
    }

  }, [data]);

  return (
    <div>
      {/* THE SEARCH BAR */}
      <div className="input-group">
        <div className="form-outline">
          <input id="search-input" type="search" className="form-control" placeholder="Search for names.." />
          <label className="form-label" htmlFor="search-input">Search</label>
        </div>
        <button id="search-button" type="button" className="btn btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <br />
          {/* THE CHECKBOXES FOR FILTERING */}
          <div class="checkbox-group">
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="Clothing and Accessories" value="Clothing and Accessories" />
    <label class="form-check-label" for="Clothing and Accessories">Clothing and Accessories</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="Electronics and Appliances" value="Electronics and Appliances" />
    <label class="form-check-label" for="Electronics and Appliances">Electronics and Appliances</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="Books" value="Books" />
    <label class="form-check-label" for="Books">Books</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="Furniture and Home Decor" value="Furniture and Home Decor" />
    <label class="form-check-label" for="Furniture and Home Decor">Furniture and Home Decor</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="Sports and Fitness" value="Sports and Fitness" />
    <label class="form-check-label" for="Sports and Fitness">Sports and Fitness</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="Kitchen and Dining" value="Kitchen and Dining" />
    <label class="form-check-label" for="Kitchen and Dining">Kitchen and Dining</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="Other" value="Other" />
    <label class="form-check-label" for="Other">Other</label>
  </div>
</div>
      <br />
      <section style={{ backgroundColor: '#eee' }}>
        <div id="productContainer" className="container py-5">
          {/* Render product cards */}
          {data.map(entry => (
            <ProductCard data={entry} toDelist={false} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Buy;

