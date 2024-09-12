// frontend/src/components/Authpage.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Authpage({ setIsAuthenticated }) {
  const [inputCode, setInputCode] = useState("");
  
  const secretCode = "clubsecret";

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputCode(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    if (inputCode === secretCode) {
      setIsAuthenticated(true); 
      alert("Access Granted") 
      navigate("/students");  
    } else {
      alert("Access Denied");
    }

    setInputCode("");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter Secret Code</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Secret Code</label>
          <input
            type="password"
            value={inputCode}
            onChange={handleChange}
            placeholder="Enter Secret Code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Authpage;
