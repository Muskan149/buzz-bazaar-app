// TODO: Add user Profile details to the insert command query
import React, { useContext, useEffect, useState } from 'react';
import { supabase } from '../js/supabaseConfig.js'
import useUserInfo from '../js/useUserInfo.js';  
import ImageUpload from './ImageUpload.js';

const Sell2 = () => {
    const { user, userId, userInfo } = useUserInfo();

    if (userId && userInfo) {
        console.log(Object.values(userInfo));
    }

    // all the form fields
    const [formData, setFormData] = useState({
        product_name: '',
        product_category: '',
        product_description: '',
        product_image: '',
        product_price: '',
        price_negotiable: '',
        rendezvous: '',
    });


    const [publicURL, setPublicURL] = useState(null);

    const handlePublicURLChange = (url) => {
      setPublicURL(url);
      console.log(url)
    };


    // handle in
    const handleInputChange = (event) => {
        console.log("we reached the handle stage")
        const { name, value } = event.target;
        console.log("name: " + name)
        console.log("value: " + value)
        setFormData({ ...formData, [name]: value });
    };

    const listToString = () => {
        const checkboxes = document.querySelectorAll('input[name="payment-method"]:checked');
        const checkedCheckboxes = Array.from(checkboxes).map((checkbox) => checkbox.value).join(', ');
        return checkedCheckboxes;
    };

    const handleSubmit2 = async (e) => {
        e.preventDefault();
        let { data: product_info, error } = await supabase
        .from('product_info')
        .select('*')

        if (error) {
            console.log(error);
        } else {
            console.log(product_info)
        }
    }

  

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Object.entries(formData))
    }

    const submitForm = async (e) => {
        e.preventDefault()
        console.log(userId)
        const payment_method = listToString();
        console.log(payment_method)
        const { product_name, product_category, product_description, product_image, product_price, price_negotiable, rendezvous } = formData;
        console.log(Object.entries(formData))
        console.log("Submitting this id: " + userId)
        console.log("This is the userInfo: " + userInfo["0"])
        
        
        // Insert data into 'product-info' table
        let { data, error } = await supabase
            .from('product_info')
            .insert([
                {
                    user_id: userId,
                    display_name: userInfo.display_name ,
                    email: userInfo.email,
                    contact_number: userInfo.contact_number,
                    product_name: product_name,
                    product_category: product_category,
                    product_description: product_description,
                    product_image: publicURL,
                    product_price: product_price,
                    payment_method: payment_method,
                    rendezvous: rendezvous,
                },
            ])
            .select();
        if (error) {
            console.error('Error inserting data:', error.message);
        } else {
            console.log('Data inserted successfully:', Object.entries(data));
            alert('Data inserted successfully!');
        }

    };

    return (
        <form id="sell-form" autoComplete="off">
            <fieldset className="sell-heading-fieldset">
                <label>
                    Need to sell your old stuff out? Buzz Bazaar harnesses the strength of your campus community to connect you with eager buyers for your books, furniture, electronics, and more!
                </label>
            </fieldset>

            <fieldset>
                <h3 className="sell-subsection">Product Details</h3>
            </fieldset>

            <fieldset>
                <legend htmlFor="product_name">Product Name</legend>
                <div className="form-group">
                    <input id="product_name" type="text" name="product_name" className="form-control" required onChange={handleInputChange}/>
                </div>
            </fieldset>

            <fieldset>
                <legend htmlFor="product_category">Product Category</legend>
                <div className="form-group">
                    {/* Replace "name" with "id" for better accessibility */}
                    <div className="radio">
                        <label>
                            <input type="radio" id="product_category" name="product_category" value="Electronics/Appliances" required onChange={handleInputChange}/>
                            Electronics/Appliances
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Clothing and Accessories" required onChange={handleInputChange}/>
                            Clothing and Accessories
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Books" required onChange={handleInputChange}/>
                            Books
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Furniture and Home Decor" required onChange={handleInputChange}/>
                            Furniture and Home Decor
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Sports and Fitness" required onChange={handleInputChange}/>
                            Sports and Fitness
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Kitchen and Dining" required onChange={handleInputChange}/>
                            Kitchen and Dining
                        </label>
                    </div>
                    {/* <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Event Tickets" required onChange={handleInputChange}/>
                            Event Tickets
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Course Notes" required onChange={handleInputChange}/>
                            Course Notes
                        </label>
                    </div> */}
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Other" required onChange={handleInputChange}/>
                            Other
                        </label>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="name-and-description">
                    <legend htmlFor="product_description">Product Description</legend>
                    <p className="help-block">Enter details of the product (for example: condition, age)</p>
                </div>
                <div className="form-group">
                    <textarea id="product_description" name="product_description" rows="4" cols="50" onChange={handleInputChange}/>
                </div>
            </fieldset>

            <fieldset>
                <legend htmlFor="product_image">Product Image</legend>
                <div className="form-group">
                <ImageUpload onPublicURLChange={handlePublicURLChange} />
                {publicURL && <img src={publicURL} alt="Uploaded" />} {/* Show uploaded image */}
                </div>
            </fieldset>

            {/* <fieldset>
                <legend htmlFor="selling-for-free">Selling for free? </legend>
                <div className="form-group">
                    <input id="selling-for-free" type="checkbox" name="selling_for_free" />
                </div>
            </fieldset> */}

            <fieldset>
                <legend htmlFor="product_price">Price (in $)</legend>
                <div className="form-group">
                    <input id="product_price" type="text" name="product_price" className="form-control" required onChange={handleInputChange}/>
                </div>
            </fieldset>

            <fieldset>
                <legend htmlFor="price_negotiable">Is the price negotiable?</legend>
                <div className="form-group">
                    <div className="radio">
                        <label>
                            <input type="radio" name="price_negotiable" value="Yes" onChange={handleInputChange}/>
                            Yes
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" name="price_negotiable" value="No" onChange={handleInputChange}/>
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
                            <input type="checkbox" name="payment-method" value="Cash" />
                            Cash
                        </label>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend htmlFor="rendezvous">Where do you prefer to meet and hand over the product?</legend>
                <div className="form-group">
                    <input id="rendezvous" type="text" name="rendezvous" className="form-control" required onChange={handleInputChange}/>
                </div>
            </fieldset>
            <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>
        </form>
    );
};

export default Sell2;
