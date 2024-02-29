import { useState, useEffect } from 'react';
import { supabase } from './supabaseConfig.js'

const useProductInfo = () => {
  const [productInfoData, setProductInfoData] = useState(null);
  const [errorFetchingData, setErrorFetchingData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('product_info')
          .select();
        if (error) {
          setErrorFetchingData('Error retrieving data');
          console.error('Error retrieving data:', error);
        } else {
          setProductInfoData(data);
        }
      } catch (error) {
        setErrorFetchingData('An error occurred during data retrieval');
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleRetrieveData = () => {
    console.log('Retrieve data', productInfoData);
    // Perform any additional actions with the retrieved data
  };

  return { productInfoData, errorFetchingData, handleRetrieveData };
};

export default useProductInfo;
