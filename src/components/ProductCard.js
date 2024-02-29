import {React, useContext} from 'react';
import { supabase } from '../js/supabaseConfig.js'
import { SessionContext } from './AuthProvider';


const ProductCard = ({ data, toDelist }) => {
  const session = useContext(SessionContext);
  const negotiation = data["price_negotiable"] ? " | Negotiation allowed" : " | Negotiation not allowed";

  const delist = async (productId) => {
    // Implement your delist logic here
    console.log("Delisting product with ID:", productId);
    const { error } = await supabase
    .from('product_info')
    .delete()
    .eq('product_id', productId)

    if (error) {
      console.error(error)
    } else {
      alert("Item de-listed!")
      
      // Redirect the user to the userProfile page
      window.location.href = "/userProfile"; // Change the URL as needed
    }
  };

  const loginAlert = () => {
    alert("you need to login first")
    };

  return (
    <div className='row justify-content-center mb-3'>
    <div className="col-md-12 col-xl-10">
      <div className="card shadow-0 border rounded-3">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
              <div className="bg-image hover-zoom ripple rounded ripple-surface">
                <img src= {data["product_image"]} alt="Product Image" className="w-100" />
                <a href="#!">
                  <div className="hover-overlay">
                    <div className="mask" style={{ backgroundColor: 'rgba(253, 253, 253, 0.15)' }}></div>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6">
              <h5 className="product-name">{data["product_name"]}</h5>
              <div className="mt-1 mb-0 text-muted small">
                <span>{data["display_name"]}</span>
              </div>
              <br />
              <p className="text mb-4 mb-md-0">{data["product_description"]}</p>
              <br />
              <p className="text mb-4 mb-md-0" style={{marginBottom: '2rem'}}>
                Hand-over at: <span style={{ color: 'green' }}>{data["rendezvous"]}</span>
            </p>
            <br />
              <div className="mt-1 mb-0 text-muted">
                <span style={{ color: 'grey' }} className="product-type">{data["product_category"]}</span>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
              <div className="d-flex flex-row mb-1">
                <span><h4 className="mb-1 me-1">$ {data["product_price"]}</h4></span>
                {negotiation}
              </div>
              <div className="d-flex flex-column mt-4">
                {toDelist ? (
                  <button className="btn btn-danger" type="button" style={{ width: '100%' }} onClick={() => delist(data["product_id"])}>
                    De-list Item
                  </button>
                ) : (
                  <>
                    <div class="d-flex flex-column mt-4">
                      {session ? (
                        <a href={`tel:${data["contact_number"]}`} target="_blank">
                          <button className="btn btn-primary btn-sm" type="button" style={{ width: '100%' }}>Call</button>
                        </a>
                      ) : (
                        <button className="btn btn-primary btn-sm" type="button" style={{ width: '100%' }} onClick={loginAlert}>Call</button>
                      )}
                      {session ? (
                        <a href={`mailto:${data["email"]}`} target="_blank">
                          <button className="btn btn-outline-primary btn-sm mt-2" type="button" style={{ width: '100%' }}>{data["email"]}</button>
                        </a>
                      ) : (
                        <button className="btn btn-outline-primary btn-sm mt-2" type="button" style={{ width: '100%' }} onClick={loginAlert}>Email</button>
                      )}
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductCard;
