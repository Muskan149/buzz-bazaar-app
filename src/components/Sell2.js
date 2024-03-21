import React, { useContext, useEffect, useState } from 'react';
import { supabase } from '../js/supabaseConfig.js'
import useUserInfo from '../js/useUserInfo.js';  
import ImageUploads from './ImageUploads.js';

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
        hand_over_spot: '',
    });


    const validatePrice = (price) => {
    // Regular expression to match numeric values with decimals
    const regex = /^\d*(\.\d+)?$/;

    // Check if the price matches the regex
    if (!regex.test(price)) {
        return false; // Price is not valid
    }

    return true; // Price is valid
    };


    const [URLList, setURLList] = useState(null);

    const handleURLListChange = (urlList) => {
        if (URLList) {
            setURLList(urlList.concat(URLList))
        } else {
            setURLList(urlList);
        }
    };

    const handleDeleteClick = () => {
        setURLList(null);
    };

    const [characterCount, setCharacterCount] = useState(0);

    // handle in
    const handleInputChange = (event) => {
        console.log("we reached the handle stage")
        const { name, value } = event.target;
        const submitButton = document.getElementById("sell-submit-button");
        if (name === 'product_price') {
            setCharacterCount(value.length);

            const priceInput = event.target.value;
            const priceRegex = /^\d+(\.\d{1,2})?$/;
        
            if (!priceRegex.test(priceInput) && priceInput.length > 0) {
                const errorMessage = document.getElementById("price-error-message");
                if (errorMessage) {
                    errorMessage.textContent = "Invalid Price amount. Must contain at most 2 decimal places and no non-numeric symbols.";
                    errorMessage.style.color = "red";
                }
                submitButton.disabled = true; // Disable the submit button
            } else {
                const errorMessage = document.getElementById("price-error-message");
                if (errorMessage) {
                    errorMessage.textContent = "";
                }
                submitButton.disabled = false; // Enable the submit button
            }
        }
        console.log("name: " + name)
        console.log("value: " + value)
        setFormData({ ...formData, [name]: value });
        if (name === 'product_description') {
            setCharacterCount(value.length);
        }
    };

    const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            // Add to selectedPaymentMethods if checked
            setSelectedPaymentMethods(prevState => [...prevState, value]);
        } else {
            // Remove from selectedPaymentMethods if unchecked
            setSelectedPaymentMethods(prevState => prevState.filter(method => method !== value));
        }
    };

    // // Function to convert selectedPaymentMethods to string
    // const listToString = () => {
    //     return 
    // };

    const submitForm = async (e) => {
        e.preventDefault()

        // Check if all required fields are filled
        const requiredFields = ['product_name', 'product_category', 'product_description', 'product_price', 'hand_over_spot'];
        const unfilledFields = requiredFields.filter(field => formData[field].length <= 0);

        if (!validatePrice(formData["product_price"])) {
            alert('Price must be a numeric value without symbols!');
            return; // Prevent form submission
        }

        // If any required field is not filled, display an error alert
        if (unfilledFields.length > 0) {
            alert(`Please fill the following required fields: ${unfilledFields.join(', ')}`);
            return; // Prevent form submission
        }

        console.log("still got out of here")

        if (URLList == null) {
            console.log("bruh")
            alert(`Please upload at least 1 product image`);
            return; // Prevent form submission
        }

        console.log("still got out of here")

        console.log(userId)
        const payment_method = selectedPaymentMethods.join(', ');
        console.log(payment_method)
        const { product_name, product_category, product_description, product_image, product_price, price_negotiable, hand_over_spot } = formData;
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
                    product_image: URLList.join(" , "),
                    product_price: product_price,
                    payment_method: payment_method,
                    rendezvous: hand_over_spot,
                },
            ])
            .select();
        if (error) {
            console.error('Error inserting data:', error.message);
        } else {
            console.log('Data inserted successfully:', Object.entries(data));
            alert('Your product is listed! 🚀');
            window.location.reload();
        }

    };

    return (
        <form id="sell-form" autoComplete="off" onSubmit={submitForm}>
            <fieldset className="sell-heading-fieldset">
                <label>
                    Need to sell your old stuff out? Buzz Bazaar harnesses the strength of your campus community to connect you with eager buyers for your books, furniture, electronics, and more!
                </label>
            </fieldset>

            <fieldset>
                <h3 className="sell-subsection">Product Details</h3>
            </fieldset>

            <fieldset>
                <legend className='col-25' htmlFor="product_name">Product Name</legend>
                <div className="form-group col-75">
                    <input id="product_name" type="text" name="product_name" className="form-control" onChange={handleInputChange} />
                </div>
            </fieldset>

            <fieldset>
                <legend className='col-25' htmlFor="product_category">Product Category</legend>
                <div className="form-group col-75">
                    <div className="radio">
                        <label>
                            <input type="radio" id="product_category" name="product_category" value="Electronics/Appliances" onChange={handleInputChange} />
                            Electronics/Appliances
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Clothing and Accessories" onChange={handleInputChange}/>
                            Clothing and Accessories
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Books" onChange={handleInputChange}/>
                            Books
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Furniture and Home Decor" onChange={handleInputChange}/>
                            Furniture and Home Decor
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Sports and Fitness" onChange={handleInputChange}/>
                            Sports and Fitness
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Kitchen and Dining"  onChange={handleInputChange}/>
                            Kitchen and Dining
                        </label>
                    </div>
                    <div class="radio">
                        <label>
                            <input type="radio" name="product_category" value="Other"  onChange={handleInputChange}/>
                            Other
                        </label>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <div className="col-25 name-and-description">
                    <legend htmlFor="product_description">Product Description</legend>
                    <p className="help-block">Enter details of the product (for example: condition, age, etc.)</p>
                </div>
                <div className="form-group col-75">
                <textarea id="product_description" name="product_description" onChange={handleInputChange} maxLength="250"
                        placeholder="White AirPods. Great condition, barely used (<2 months). Perfect for on-the-go listening with top-notch sound quality. "/>
                    <div className="character-count">{characterCount}/250</div>
                </div>
            </fieldset>

            <fieldset>
                <legend className='col-25' htmlFor="product_image">Product Image</legend>
                <div className="form-group col-75">
                <div className="image-upload-section">
                <ImageUploads onURLListChange={handleURLListChange} />
                {URLList && (
                    <button class ="img-delete-button" onClick={handleDeleteClick}>Delete Images</button>
                )}
                </div>
                <div className="image-carousel">
                {URLList && URLList.map((url, index) => (
                    <img key={index} className="img-preview" src={url} alt="Uploaded" />
                ))}
                </div>                
                </div>
            </fieldset>

            <fieldset>
                <legend className='col-25' htmlFor="product_price">Price (in $)</legend>
                <div className="form-group col-75">
                    <input id="product_price" type="text" name="product_price" className="form-control" onChange={handleInputChange}/>
                    <div id="price-error-message"></div> 
                </div>
            </fieldset>


            <fieldset>
                <legend className='col-25' htmlFor="price_negotiable">Is the price negotiable?</legend>
                <div className="form-group col-75">
                    <div className="radio">
                        <label>
                            <input type="radio" name="price_negotiable" value="Yes" onChange={handleInputChange} />
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
                <legend className='col-25' htmlFor="payment-method" >Preferred Payment Methods</legend>
                <div className="checkboxes form-group col-75">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" name="payment-method" value="PayPal" onChange={handleCheckboxChange}/>
                            PayPal
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="payment-method" value="Venmo" onChange={handleCheckboxChange}/>
                            Venmo
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="payment-method" value="Zelle" onChange={handleCheckboxChange}/>
                            Zelle
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" name="payment-method" value="Cash" onChange={handleCheckboxChange}/>
                            Cash
                        </label>
                    </div>
                </div>
            </fieldset>
            <fieldset>
                <legend className='col-25' htmlFor="hand_over_spot">Where do you prefer to meet and hand over the product?</legend>
                <div className="form-group col-75">
                    <input id="hand_over_spot" type="text" name="hand_over_spot" className="form-control" onChange={handleInputChange}/>
                </div>
            </fieldset>
            <button type="submit" id="sell-submit-button" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default Sell2;
