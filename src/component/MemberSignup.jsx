import React, { useState } from "react";

export default function MemberSignup() {
  const [formData, setFormData] = useState({
    email: "",
    oneTimePassword: "",
    name: "",
    mobile: "",
    address: "",
    confirmPassword: "",
    newPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    oneTimePassword: "",
    name: "",
    mobile: "",
    address: "",
    confirmPassword: "",
    newPassword: "",
  });

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
      errors.email = "Email is required";
    }
    if (!formData.oneTimePassword) {
      errors.oneTimePassword = "One-time password is required";
    }
    if (!formData.name) {
      errors.name = "Name is required";
    }
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required";
    }
    if (!formData.address) {
      errors.address = "Address is required";
    }
    if (!formData.newPassword) {
      errors.newPassword = "New Password is required";
    }
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    }
    if (formData.confirmPassword !== formData.newPassword) {
      errors.passwordNotMatched =
        "Confirm Password and New Password should be same.";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    
  };

  return (
    <div className="md:w-4/12 w-full mx-auto flex items-center justify-center min-h-screen">
      <div className="w-full p-6 bg-white shadow-md rounded-md">
        <div className="mb-6 text-center">
          <span className="text-lg font-semibold">
            Sign up to activate your account
          </span>
        </div>
        <div>
          {formErrors.passwordNotMatched && (
            <p className="text-red-500 text-sm">
              {formErrors.passwordNotMatched}
            </p>
          )}
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`px-4 py-2 border ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="oneTimePassword"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              One-time Password:
            </label>
            <input
              type="password"
              id="oneTimePassword"
              name="oneTimePassword"
              value={formData.oneTimePassword}
              onChange={handleChange}
              className={`px-4 py-2 border ${
                formErrors.oneTimePassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.oneTimePassword && (
              <p className="text-red-500 text-sm">
                {formErrors.oneTimePassword}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="newPassword"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className={`px-4 py-2 border ${
                formErrors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.newPassword && (
              <p className="text-red-500 text-sm">{formErrors.newPassword}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`px-4 py-2 border ${
                formErrors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {formErrors.confirmPassword}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`px-4 py-2 border ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="mobile"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Mobile:
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className={`px-4 py-2 border ${
                formErrors.mobile ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.mobile && (
              <p className="text-red-500 text-sm">{formErrors.mobile}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="address"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`px-4 py-2 border ${
                formErrors.address ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formErrors.address && (
              <p className="text-red-500 text-sm">{formErrors.address}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
