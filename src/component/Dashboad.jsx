import React, { useEffect, useState } from 'react';
import { auth, database } from '../Firebase';
import { ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
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
    return null; // Optionally handle this case
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700">Name:</span>
          <span className="text-gray-900">{userData.name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700">Email:</span>
          <span className="text-gray-900">{userData.email}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700">Mobile:</span>
          <span className="text-gray-900">{userData.mobile}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-semibold text-gray-700">Address:</span>
          <span className="text-gray-900">{userData.address}</span>
        </div>
      </div>
    </div>
  );
}
