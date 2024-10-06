import React, { useEffect, useState } from 'react';
import { auth, database } from '../Firebase';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import Hero from '../component/Hero';
import SideNavbar from '../component/SideNavbar';
import AddNewMember from './AddNewMember';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
        // Fetch user data from Realtime Database
        const userRef = ref(database, `users/${user.uid}`);
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              setUserData(snapshot.val());
            } else {
              console.error('No user data found');
              navigate('/login');
            }
            setLoading(false);
          })
          .catch((error) => {
            console.error('Error fetching user data:', error);
            navigate('/login');
            setLoading(false);
          });
      } else {
        navigate('/login');
        setLoading(false);
      }
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!userData) {
    return null; 
  }

  //handle page content

  return (
    
    <div className='md:w-full md:h-full '>
          
          <div className='md:w-full md:h-20'>
             <Hero userName = {userData.name}/>
          </div>
          <div className='md:flex md:flex-row md:w-full md:h-full '>
            {/* sidebar for desktop*/}
            <div className='md:w-2/12 md:h-full bg-blue-300'>
               <SideNavbar />

            </div>
            {/* body */}
            <div className='md:w-10/12 md:h-full'>
              <span>
                <AddNewMember />
              </span>
            </div>
          </div>
    </div>
  );
}
