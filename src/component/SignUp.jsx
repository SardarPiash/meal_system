import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database'; 
import { auth, database, sendVerificationEmail } from '../Firebase'; 
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    mobile: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    if (!formData.name) {
      errors.name = 'Name is required';
    }
    if (!formData.mobile) {
      errors.mobile = 'Mobile number is required';
    }
    if (!formData.address) {
      errors.address = 'Address is required';
    }

    setFormErrors(errors);

    
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    const { email, password, name, mobile, address } = formData;

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      const emailVerification = await sendVerificationEmail(user);

      // Store user data in Firebase database
      const userRef = ref(database, 'users/' + user.uid);
      await set(userRef, {
        email,
        name,
        mobile,
        address,
        role: "admin",
        status: false,
      });

      // Redirect to login page after successful signup
      navigate("/login");

    } catch (error) {
      console.error('Sign-up error:', error.code, error.message);
      setError(error.message);
      setSuccess('');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      {error && <p className="mb-4 text-red-500">{error}</p>}
      {success && <p className="mb-4 text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`px-4 py-2 border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`px-4 py-2 border ${formErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`px-4 py-2 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="mobile" className="mb-2 text-sm font-medium text-gray-700">Mobile:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={`px-4 py-2 border ${formErrors.mobile ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {formErrors.mobile && <p className="text-red-500 text-sm">{formErrors.mobile}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="address" className="mb-2 text-sm font-medium text-gray-700">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`px-4 py-2 border ${formErrors.address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
      <div className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/" className="text-blue-500 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
