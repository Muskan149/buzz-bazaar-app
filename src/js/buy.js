// Assume 'product-info' variable is retrieved using the code
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://exbvxvbfxaijhoiklipu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YnZ4dmJmeGFpamhvaWtsaXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2ODk4NTQsImV4cCI6MjAxODI2NTg1NH0.epQovNdFMM734Wa11OmmW2EuWhpWlOiE16jiboykPtE'
const supabase = createClient(supabaseUrl, supabaseKey);
alert("reached buy.js")

// START THE DATA RETRIEVE PROCESS
let { data, error } = await supabase.from('product-info').select('*');
if (error) {
    console.error('Error fetching product data:', error);
} else {
    // Loop through each entry in the data array
    data.forEach((entry, index) => {
        console.log(`Keys for entry ${index}:`, entry["seller_name"]);
    });
}
// END

document.addEventListener('DOMLoaded', function () {
    // Access the productContainer element
    const productContainer = document.getElementById('productContainer');
    console.log(productContainer == null)

    // Loop through each entry in the product-info data
    data.forEach(entry => {
        console.log(entry)
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
                    <img src="https://picsum.photos/200/300" alt="Your Image Description" class="w-100" />
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
                            <span>${entry["seller_name"]}</span>
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
                          <a href="tel:${entry["seller_contact"]}" target="_blank"><button class="btn btn-primary btn-sm" type="button" style="width: 100%;">
                            Call</button>
                            <a href="mailto:Muskanmahajan2004@gmail.com" target="_blank"><button class="btn btn-outline-primary btn-sm mt-2" type="button" style="width: 100%;">Muskanmahajan2004@gmail.com</button></a>
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
});
