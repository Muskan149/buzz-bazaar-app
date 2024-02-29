import {React, useState, useEffect}from 'react';
import { logout } from '../js/auth';
import { supabase } from '../js/supabaseConfig.js'
import useUserInfo from '../js/useUserInfo.js';  
import ProductCard from './ProductCard.js';


const UserProfile = () => {
  const { user, userId, userInfo, userProductInfo} = useUserInfo();
  const [data, setData] = useState([]);
  const [userName, setUserName ] = useState("");
  const [userEmail, setUserEmail ] = useState("");
  const [userContact, setUserContact ] = useState("");

  // useEffect
  // if (userId && userInfo) {
  //     console.log("User info: " + Object.values(userInfo));
  // }

  // if (userProductInfo) {
  //   console.log("User product info: " + Object.entries(userProductInfo))
  // }

  useEffect(() => {
    if (userId && userInfo) {
        console.log("User info: " + Object.values(userInfo));
        setUserName(userInfo.display_name);
        setUserEmail(userInfo.email);
        setUserContact(userInfo.contact_number);
    }

    if (userProductInfo) {
      console.log("User product info: " + Object.entries(userProductInfo))
      setData(userProductInfo)
    }
  }, [userProductInfo])


  return (
    <section style={{ backgroundColor: '#eee' }}>
      <div className="container py-5">
        {/* USER PROFILE STARTS HERE */}
        <h2>Your Profile</h2>
        <br />
        <div className="row justify-content-center mb-3">
          <div className="col-md-12 col-xl-10">
            <div className="card mb-4">
              <div className="card-body text-center" id="user-profile">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />
                <h5 className="my-3">{ userName }</h5>
                <span><a href={'tel:' + userContact}>
                  <p className="text-muted mb-1">{ userContact }</p>
                </a>
                <a href={'mailto:' + userEmail}>
                <p className="text-muted mb-4">{ userEmail }</p>
                </a></span>
                
                <div className="d-flex justify-content-center mb-2">
                  <button
                    type="button"
                    id="logout-button"
                    className="btn btn-danger"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        {/* USER ORDERS STARTS HERE */}
        <h2>Your Orders</h2>
        <br />
        <section style={{ backgroundColor: '#eee' }}>
        <div id="productContainer" className="container py-5">
          {/* Render product cards */}
          {data.map(entry => (
            <ProductCard data={entry} toDelist={true} />
          ))}
        </div>
      </section>
    </div>
    </section>
  );
};

export default UserProfile;
