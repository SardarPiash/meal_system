import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../Firebase";  // Import Firebase configuration

export default function BazarList() {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        const db = getDatabase(app);
        const usersRef = ref(db, 'users'); // Reference to the 'users' node in Firebase
        
        onValue(usersRef, (snapshot) => {
            const data = snapshot.val();
            const usersArray = [];
            for (let id in data) {
                usersArray.push({ id, ...data[id] }); // Extract data and push to the array
            }
            setUserData(usersArray); // Set state with the user data array
            console.log(usersArray); // Log the fetched data
        });
    }, []);  // Run once when the component mounts

    return (
        <div>
            <h2>Fetched User Data</h2>
            <ul>
                {userData.map((user) => (
                    <li key={user.id}>
                        <strong>Name:</strong> {user.name}, <strong>ID:</strong> {user.id}
                    </li>
                ))}
            </ul>
        </div>
    );
}
