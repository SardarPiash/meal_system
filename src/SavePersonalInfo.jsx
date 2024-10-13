// src/SavePersonalInfo.js
import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "./Firebase";  // Import your Firebase configuration

const SavePersonalInfo = () => {
  const [name, setName] = useState("");
  let e = 0 //,setE] = useState(0);
  const [userData, setUserData] = useState([]);

  // Function to save data to Firebase
  const saveData = () => {
    const db = getDatabase(app);  // Get reference to the Firebase Realtime Database
    const userId = Math.floor(Math.random() * 10) + 1;  // Create a unique ID for the user (for simplicity)
    
    console.log(e)
    set(ref(db, 'users/'+userId), {
      id: userId,
      name: name,
      

    })
    .then(() => {
      console.log("Data saved successfully!");
      // Reset the input fields
      setName("");
    })
    .catch((error) => {
      console.error("Error saving data: ", error);
    });
  };

  // Function to fetch and listen for data from Firebase
  useEffect(() => {
    const db = getDatabase(app);
    const usersRef = ref(db, 'users');
    
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const usersArray = [];
      for (let id in data) {
        usersArray.push({ id, ...data[id] });
      }
      setUserData(usersArray);
    });
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Save Personal Information</h2>
      <div>
        <label>Name:</label>
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name" 
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={saveData}>Save to Firebase</button>
      </div>

      {/* Displaying saved user data */}
      <div style={{ marginTop: "30px" }}>
        <h3>Saved Users</h3>
        <ul>
          {userData.map((user) => (
            <li key={user.id}>
              <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SavePersonalInfo;
