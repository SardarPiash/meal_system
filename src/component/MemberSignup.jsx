import React, { useState } from "react";

export default function MemberSignup() {
    const [formData,setFormData] = useState({
        email:"",
        oneTimePassword:"",
        name:"",
        mobile:"",
        address:""
    })

    const handleChange = ()=>{

    }

    const handleSubmit=()=>{

    }
  return (
    <div>
      <form className="space-y-4">
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
            htmlFor="password"
            className="mb-2 text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`px-4 py-2 border ${
              formErrors.password ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {formErrors.password && (
            <p className="text-red-500 text-sm">{formErrors.password}</p>
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
          onClick={handleSubmit}
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
