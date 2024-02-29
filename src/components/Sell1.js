// TODO: Add supabaseURL and Key 
import React, { useContext, useEffect, useState } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { supabase } from '../js/supabaseConfig.js'
import useProductInfo from '../js/useProductInfo.js';  


const Sell1 = () =>  {

  // all the form fields
  const [formData, setFormData] = useState({
    product_name: '',
    product_category: '',
    product_description: '',
    product_image: '',
    price: '',
    negotiable: '',
    rendezvous: '',
  });

  // handle in
  const handleInputChange = (event) => {
    console.log("we reached the handle stage")
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const listToString = () => {
    const checkboxes = document.querySelectorAll('input[name="payment-method"]:checked');
    const checkedCheckboxes = Array.from(checkboxes).map((checkbox) => checkbox.value).join(', ');
    return checkedCheckboxes;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const payment_method = listToString();
    const { product_name, product_category, product_description, product_image, price, negotiable, rendezvous } = formData;
    console.log(Object.entries(formData))
    try {
      // Insert data into 'product-info' table
      const { data, error } = await supabase
        .from('product-info')
        .insert([
          {
            product_name: "Hello Kitty",
            product_category: "Kitchen and Dining",
            product_desc: "Hello Kitty",
            product_image: "https://picsum.photos/200",
            price: "123",
            price_negotiable: true,
            payment_method: "Zelle",
            rendezvous_spot: "Kaldis",
          },
        ]);

      if (error) {
        console.error('Error inserting data:', error);
      }
      console.log('Data inserted successfully:', data);
      alert(`Submission successful for ${userId}`);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during submission');
    }
  };

  let userId = null;
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        setUser(data?.user || null);
        console.log("user is " + Object.entries(data.user))
        userId = data.user.userId
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };
    fetchUserData();
  }, [supabase]);

  return (
    <form id="sell-form">
      <fieldset className="sell-heading-fieldset">
        <label>
          Need to sell your old stuff out? Buzz Bazaar harnesses the strength of your campus community to connect you with eager buyers for your books, furniture, electronics, and more!
        </label>
      </fieldset>

      <fieldset>
        <h3 className="sell-subsection">Product Details</h3>
      </fieldset>

      <fieldset>
        <legend htmlFor="product-name">Product Name</legend>
        <div className="form-group">
          <input id="product-name" type="text" name="product_name" className="form-control" required />
        </div>
      </fieldset>

      <fieldset>
        <legend htmlFor="product-category">Product Category</legend>
        <div className="form-group">
          {/* Replace "name" with "id" for better accessibility */}
          <div className="radio">
            <label>
              <input type="radio" id="product-category" name="product_category" value="Electronics/Appliances" required />
              Electronics/Appliances
            </label>
          </div>
          <div class="radio">
                <label>
                    <input type="radio" name="product_category" value="Clothing and Accessories" required />
                    Clothing and Accessories
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="product-category" value="Books" required />
                    Books
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="product-category" value="Furniture and Home Decor" required />
                    Furniture and Home Decor
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="product-category" value="Sports and Fitness" required />
                    Sports and Fitness
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="product-category" value="Kitchen and Dining" required />
                    Kitchen and Dining
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="product-category" value="Event Tickets" required />
                    Event Tickets
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="product-category" value="Course Notes" required />
                    Course Notes
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="product-category" value="Other" required />
                    Other
                </label>
            </div>
        </div>
      </fieldset>

      <fieldset>
        <div className="name-and-description">
          <legend htmlFor="product-description">Product Description</legend>
          <p className="help-block">Enter details of the product (for example: condition, age)</p>
        </div>
        <div className="form-group">
          <textarea id="product-description" name="product-description" rows="4" cols="50"></textarea>
        </div>
      </fieldset>

      <fieldset>
        <legend htmlFor="product-image">Product Image</legend>
        <div className="form-group">
          <input type="file" id="product-image" name="product-image" className="form-control" accept=".jpg, .jpeg, .png" />
        </div>
      </fieldset>

      <fieldset>
        <legend htmlFor="selling-for-free">Selling for free? </legend>
        <div className="form-group">
          <input id="selling-for-free" type="checkbox" name="selling_for_free" onChange={handleInputChange} />
        </div>
      </fieldset>

      <fieldset>
        <legend htmlFor="product-price">Price</legend>
        <div className="form-group">
          <input id="product-price" type="text" name="product-price" className="form-control" required />
        </div>
      </fieldset>

      <fieldset>
        <legend htmlFor="negotiable">Is the price negotiable?</legend>
        <div className="form-group">
          <div className="radio">
            <label>
              <input type="radio" name="negotiable?" value="Yes" />
              Yes
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="negotiable?" value="No" />
              No
            </label>
          </div>
        </div>
      </fieldset>

      <fieldset>
        <h3 className="sell-subsection">Miscellaneous info</h3>
      </fieldset>

      <fieldset>
        <legend htmlFor="payment-method">Preferred Payment Methods</legend>
        <div className="form-group">
          <div className="checkbox">
            <label>
              <input type="checkbox" name="payment-method" value="PayPal" />
              PayPal
            </label>
          </div>
          <div class="checkbox">
                <label>
                    <input type="checkbox" name="payment-method" value="Venmo" />
                    Venmo
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="payment-method" value="Zelle" />
                    Zelle
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="payment-method" value="Cash"  />
                    Cash
                </label>
            </div>
        </div>
      </fieldset>
      <fieldset>
        <legend htmlFor="rendezvous">Where do you prefer to meet and hand over the product?</legend>
        <div className="form-group">
          <input id="rendezvous" type="text" name="rendezvous" className="form-control" required />
        </div>
      </fieldset>
      <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>
    </form>
  );
};

export default Sell1;
