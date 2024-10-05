import React from "react";
import logo from "../assets/logo.png";

export default function Hero({ userName }) {
  console.log(userName);
  return (
    <div className="md:w-full md:h-full md:flex md:flex-row justify-between">
      <div>
        <img src={logo} className="md:w-20 md:h-20" />
      </div>
      <div className="">
        <div className="md:flex md:flex-col">
          <span className="text-gray-500 font-semibold text-2xl mx-auto">Welcome, Mr. {userName}</span>
          <span className="text-gray-500 font-semibold text-xl mx-auto">Dashboard</span>
        </div>
      </div>
      <div>logo</div>
    </div>
  );
}
