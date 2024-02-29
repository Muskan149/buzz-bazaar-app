import React, { useEffect, useState, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SessionContext } from './AuthProvider';
import { supabase } from '../js/supabaseConfig.js'

const Buy1 = () => {
  console.log("entered buy")
  const session = useContext(SessionContext);

  // State to store data retrieved from Supabase
  const [data, setData] = useState([]);

  useEffect(() => { // Fetching data from the product_info table
    // Fetch data from Supabase
    const fetchData = async () => {
      try {
        const { data: fetchedData, error } = await supabase.from('product_info').select('*');
        console.log(Object.keys(fetchedData))
        if (error) {
          console.error('Error fetching product data:', error);
        } else {
          setData(fetchedData);
        }
      } catch (error) {
        console.error('Error fetching product data:', error.message);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the component mounts


  useEffect(() => {
    // Access the productContainer element
    const productContainer = document.getElementById('productContainer');
    // Loop through each entry in the product-info data
    data.forEach(entry => {
      console.log(Object.entries(entry))
      // Create elements for the product card
      const productCard = document.createElement('div');
      productCard.className = 'row justify-content-center mb-3';
      let negotiation = entry["price_negotiable"] ? " | Negotiation allowed" : " | Negotiation not allowed";
      productCard.innerHTML = `
        <div class="col-md-12 col-xl-10">
          <div class="card shadow-0 border rounded-3">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                  <div class="bg-image hover-zoom ripple rounded ripple-surface">
                    <img src="https://picsum.photos/200/200" alt="Your Image Description" class="w-100" />
                    <a href="#!">
                      <div class="hover-overlay">
                        <div class="mask" style="background-color: rgba(253, 253, 253, 0.15);"></div>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="col-md-6 col-lg-6 col-xl-6">
                  <h5 class="product-name">${entry["product_name"]}</h5>
                  <div class="mt-1 mb-0 text-muted small">
                    <span>${entry["display_name"]}</span>
                  </div>
                  <br>
                  <p class="text mb-4 mb-md-0">${entry["product_desc"]}</p>
                  <br>
                  <p class="text mb-4 mb-md-0">
                    Hand-over at: <span style="color:green;">${entry["rendezvous_spot"]}</span>
                  </p>
                  <br>
                  <div class="mt-1 mb-0 text-muted">
                    <span style="color:grey;" class="product-type">${entry["product_category"]}</span>
                  </div>
                </div>
                <div class="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                  <div class="d-flex flex-row mb-1">
                    <span><h4 class="mb-1 me-1">$ ${entry["price"]}</h4></span>
                    ${negotiation}
                  </div>
                  <div class="d-flex flex-column mt-4">
                  ${
                    // Conditionally render the "Call" button
                    session
                      ? `<a href="tel:${entry["seller_contact"]}" target="_blank">
                          <button class="btn btn-primary btn-sm" type="button" style="width: 100%;">Call</button>
                        </a>`
                      : `<button class="btn btn-primary btn-sm" type="button" style="width: 100%;" disabled>Call</button>`
                  }
                  ${
                    // Conditionally render the "Call" button
                    session
                      ? `<a href="mailto:${entry["seller_email"]}" target="_blank">
                          <button class="btn btn-outline-primary btn-sm mt-2" type="button" style="width: 100%;">${entry["seller_email"]}</button>
                        </a>`
                      : `<button class="btn btn-outline-primary btn-sm mt-2" type="button" style="width: 100%;" disabled>Email</button>`
                  }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      // Append the product card to the container
      productContainer.appendChild(productCard);
    });
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
          {/* Product cards will be dynamically added here */}
        </div>
      </section>
    </div>
  );
};

export default Buy1;
