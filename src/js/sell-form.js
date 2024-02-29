// // Replace 'your-api-key' and 'your-database-url' with your actual Supabase API Key and URL
// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// const supabaseUrl = 'https://exbvxvbfxaijhoiklipu.supabase.co'
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YnZ4dmJmeGFpamhvaWtsaXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2ODk4NTQsImV4cCI6MjAxODI2NTg1NH0.epQovNdFMM734Wa11OmmW2EuWhpWlOiE16jiboykPtE'
// const supabase = createClient(supabaseUrl, supabaseKey);

// alert("hey")
// async function submitForm() {
//     alert("start submission");
//     const form = document.getElementById('sell-form');
//     const formData = new FormData(form);

//     const user_name = formData.get('user-name');
//     const user_contact = formData.get('user-contact');
//     const product_name = formData.get('product-name');
//     const product_category = formData.get('product-category');
//     const product_description = formData.get('product-description');
//     const product_image = formData.get('product-image').files[0];
//     const price = formData.get('price');
//     const negotiable = formData.get('negotiable?');
//     const payment_method = formData.get('payment-method');
//     const rendezvous = formData.get('rendezvous');
    
//     const { image_data, image_error } = await supabase.storage
//     .from('product-images')
//     .upload(product_image.name, product_image)


//     // Replace 'your-table-name' with the actual name of your Supabase table
//     const { data, error } = await supabase
//     .from('product-info')
//     .insert([
//     { "user-name": user_name,
//     'user-contact': user_contact,
//     'product-name': product_name,
//     'product-category': product_category,
//     'product-description': product_description,
//     'product-image': image_data.publicURL,
//     'price': price,
//     'negotiable?': negotiable,
//     'payment-method': payment_method,
//     'rendezvous': rendezvous },
//     ])
//     .select()
//     alert("complete submission for " + data);
// }
// alert("hey2")

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://exbvxvbfxaijhoiklipu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YnZ4dmJmeGFpamhvaWtsaXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2ODk4NTQsImV4cCI6MjAxODI2NTg1NH0.epQovNdFMM734Wa11OmmW2EuWhpWlOiE16jiboykPtE'
const supabase = createClient(supabaseUrl, supabaseKey);

const fileToArrayBuffer = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event) => {
        resolve(event.target.result);
      };
  
      reader.onerror = (event) => {
        reject(event.target.error);
      };
  
      reader.readAsArrayBuffer(file);
    });
  }

// Example: Log checked checkboxes to the console
function listToString(event) {
    alert("entered the script")
    event.preventDefault()
    var checkboxes = document.querySelectorAll('input[name="entry.payment-method"]');

    // Array to store checked checkboxes
    var checkedCheckboxes = "";

    // Iterate through checkboxes
    checkboxes.forEach(function(checkbox) {
        // Check if the checkbox is checked
        if (checkbox.checked) {
            // Store or do something with the checked checkbox
            checkedCheckboxes = checkedCheckboxes + checkbox.value + ", "
        }
    });

    if (checkedCheckboxes.length > 0) {
        checkedCheckboxes = checkedCheckboxes.substring(0, checkedCheckboxes.lastIndexOf(","));
    }
    return checkedCheckboxes;
}

window.submitForm = async function(event) {
    event.preventDefault(); // Prevent default form submission
    alert("start submission");
    const form = document.getElementById('sell-form');
    const formData = new FormData(form);
    alert("received form data");
    const user_name = formData.get('entry.user-name');
    const user_contact = formData.get('entry.user-contact');
    const product_name = formData.get('entry.product-name');
    const product_category = formData.get('entry.product-category');
    const product_description = formData.get('entry.product-description');


    const product_image = formData.get('entry.product-image');
    console.log(product_image.name)

    const price = formData.get('entry.price');
    let negotiable = formData.get('entry.negotiable?');
    negotiable = negotiable.toLowerCase() == "yes" ? true : false
    fileToArrayBuffer(product_image)
    .then(async (arrayBuffer) => {
    console.log("*****");
    console.log(arrayBuffer)
    console.log("*******")
    try {
        const { image_data, image_error } = await supabase.storage
        .from('public/product-images')
        .upload(product_image.name, arrayBuffer) 

        if (image_error) {
            throw image_error;
        }
        console.log(Object.entries(image_data))
        console.log("lol still here")
    } catch (image_error) {
      console.error("image upload error")
    }
  })
  .catch((error) => {
    console.error("Error converting to ArrayBuffer:", error);
  });
    const payment_method = listToString(event);
    const rendezvous = formData.get('entry.rendezvous');

    // Replace 'your-table-name' with the actual name of your Supabase table
    try {
        const { data, error } = await supabase
    .from('product-info')
    .insert([
    { "seller_name": user_name,
    'seller_contact': user_contact,
    'product_name': product_name,
    'product_category': product_category,
    'product_desc': product_description,
    'product_image': image_data.publicURL(),
    'price': price,
    'price_negotiable': negotiable,
    'payment_method': payment_method,
    'rendezvous_spot': rendezvous },
    ])
    .select()
    }
    catch(error) {
        alert(error)
    }
    alert("completed submission for " + user_name);
}



window.retrieve = async function() {
    const { data: product_info, error } = await supabase
      .from('product-info')
      .select('*');
    
    if (error) {
    throw error;
    }

    if (product_info && product_info.length > 0) {
    // Display data using alert dialogs
    product_info.forEach(row => { 
        alert(Object.entries(row))
        alert(`User Name: ${row['seller_name']}\nUser Contact: ${row['seller_contact']}\nProduct Name: ${row['product_name']}`);
        // Add more properties based on your data structure
    });
    } else {
    alert('No data available');
    }
  }
  
