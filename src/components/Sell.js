// TODO: Add supabaseURL and Key 
import React, { useContext, useEffect, useState } from 'react';
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { supabase } from '../js/supabaseConfig.js'
import useProductInfo from '../js/useProductInfo.js'; 
import useUserInfo from '../js/useUserInfo.js';  



const Sell = () =>  {

  const { user, userId, userInfo } = useUserInfo();

  const listToString = (event) => {
    event.preventDefault();
    const checkboxes = document.querySelectorAll('input[name="entry.payment-method"]:checked');
    const checkedCheckboxes = Array.from(checkboxes).map((checkbox) => checkbox.value).join(', ');
    console.log(checkedCheckboxes);
    return checkedCheckboxes;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const form = document.getElementById('sell-form');
    const formData = new FormData(form);
    const product_name = formData.get('entry.product-name');
    const product_category = formData.get('entry.product-category');
    const product_description = formData.get('entry.product-description');
    const product_image = formData.get('entry.product-image');
    const price = formData.get('entry.product-price');
    const negotiable = formData.get('entry.negotiable?').toLowerCase() === 'yes';
    const payment_method = listToString(event);
    const rendezvous = formData.get('entry.rendezvous');
    try {
      // Insert data into 'product-info' table
      const { data, error } = await supabase
        .from('product-info')
        .insert([
          {
            product_name: product_name,
            product_category: product_category,
            product_desc: product_description,
            product_image: `https://exbvxvbfxaijhoiklipu.supabase.in/storage/v1/object/public/product-images/${product_image.name}`,
            price: price,
            price_negotiable: negotiable,
            payment_method: payment_method,
            rendezvous_spot: rendezvous,
          },
        ]);

      if (error) {
        console.error('Error inserting data:', error);
        return;
      }
      console.log('Data inserted successfully:', data);
      alert(`Submission successful for ${userId}`);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during submission');
    }
  };



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
          <input id="product-name" type="text" name="entry.product-name" className="form-control" required />
        </div>
      </fieldset>

      <fieldset>
        <legend htmlFor="product-category">Product Category</legend>
        <div className="form-group">
          {/* Replace "name" with "id" for better accessibility */}
          <div className="radio">
            <label>
              <input type="radio" id="product-category" name="entry.product-category" value="Electronics/Appliances" required />
              Electronics/Appliances
            </label>
          </div>
          <div class="radio">
                <label>
                    <input type="radio" name="entry.product-category" value="Clothing and Accessories" required />
                    Clothing and Accessories
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="entry.product-category" value="Books" required />
                    Books
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="entry.product-category" value="Furniture and Home Decor" required />
                    Furniture and Home Decor
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="entry.product-category" value="Sports and Fitness" required />
                    Sports and Fitness
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="entry.product-category" value="Kitchen and Dining" required />
                    Kitchen and Dining
                </label>
            </div>
            <div class="radio">
                <label>
                    <input type="radio" name="entry.product-category" value="Other" required />
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
          <textarea id="product-description" name="entry.product-description" rows="4" cols="50"></textarea>
        </div>
      </fieldset>

      <fieldset>
        <legend htmlFor="product-image">Product Image</legend>
        <div className="form-group">
          <input type="file" id="product-image" name="entry.product-image" className="form-control" accept=".jpg, .jpeg, .png" />
        </div>
      </fieldset>

      <fieldset>
        <legend htmlFor="product-price">Price</legend>
        <div className="form-group">
          <input id="product-price" type="text" name="entry.product-price" className="form-control" required />
        </div>
      </fieldset>

      <fieldset>
        <legend htmlFor="negotiable">Is the price negotiable?</legend>
        <div className="form-group">
          <div className="radio">
            <label>
              <input type="radio" name="entry.negotiable?" value="Yes" />
              Yes
            </label>
          </div>
          <div className="radio">
            <label>
              <input type="radio" name="entry.negotiable?" value="No" />
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
              <input type="checkbox" name="entry.payment-method" value="PayPal" />
              PayPal
            </label>
          </div>
          <div class="checkbox">
                <label>
                    <input type="checkbox" name="entry.payment-method" value="Venmo" />
                    Venmo
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="entry.payment-method" value="Zelle" />
                    Zelle
                </label>
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" name="entry.payment-method" value="Cash"  />
                    Cash
                </label>
            </div>
        </div>
      </fieldset>
      <fieldset>
        <legend htmlFor="rendezvous">Where do you prefer to meet and hand over the product?</legend>
        <div className="form-group">
          <input id="rendezvous" type="text" name="entry.rendezvous" className="form-control" required />
        </div>
      </fieldset>
      <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>
    </form>
  );
};

export default Sell;
