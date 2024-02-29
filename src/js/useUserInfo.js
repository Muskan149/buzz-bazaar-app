// Fetches userId, and their userInfo
import { useState, useEffect } from 'react';
import { supabase } from './supabaseConfig.js'

const useUserInfo = () => {
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [userInfo , setUserInfo] = useState(null);
    const [userProductInfo, setUserProductInfo] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await supabase.auth.getUser();
                setUser(data.user);
                setUserId(data.user.id)
                let { data: user_profiles, error } = await supabase
                    .from('user_profiles')
                    .select("*")
                    // Filters
                    .eq("id", data.user.id) 
                if (user_profiles) {
                    console.log("userProfile: " + Object.entries(user_profiles))
                    setUserInfo(user_profiles["0"])
                }

                const { data: userProductInfo, error: userProductInfoError } = await supabase
                    .from('product_info')
                    .select()
                    .eq('user_id', data.user.id); // Filter records by userId
                    if (userProductInfoError) {
                        console.error('Error retrieving data:', userProductInfoError.message);
                    } else {
                        setUserProductInfo(userProductInfo);
                    }


            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };
        fetchUserData();
    }, []);

    return { user, userId, userInfo, userProductInfo};
}

export default useUserInfo;
