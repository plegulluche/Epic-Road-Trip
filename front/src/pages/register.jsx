import React from "react";
import { useState } from "react";

const CountryDrawer = ({ onSelect }) => {

  const handleSelect = (event) => {
    onSelect(event.target.value);
    
  };

  return (
    <div>
        <div className="w-full h-[40px] pl-4 border border-gray-300 rounded-xl p-2">
          <label htmlFor="country" className="font-sora text-base text-[#787878]">Country:</label>
          <select className="text-[#787878]" id="country" onChange={handleSelect}>
            <option value="">Select a country</option>
            <option value="US">United States</option>
            <option value="FR">France</option>
            {/* Add more countries as needed */}
          </select>
        </div>
      
    </div>
  );
};



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your login logic here
  };
  return (
    <div className="flex h-screen flex-col md:flex-row">
      <div className="md:w-[40%] flex items-center justify-center bg-blue-300">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src="/plane.png" alt="Logo" className="h-[55%] md-[400px]" />
          <div className="text-5xl text-[#2D2D2D] font-bold text-center">
            Ready to take off ?
          </div>
        </div>
      </div>
      <div className="md:w-[60%] flex flex-col items-center justify-center">
        <img
          src="/logo.png"
          alt="Right Panel Logo"
          className="w-auto h-auto max-h-[220px]"
        />
        <form
          onSubmit={handleSubmit}
          className="rounded p-5 flex flex-col justify-center w-full max-w-[700px]"
        >
          <p className="text-gray-500 font-semibold">Email</p>
          <input
            type="email"
            id="email-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="p-5 rounded-xl h-[30px] border-[1px] border-gray-300 w-full max-w-[700px] text-lg mb-5"
          />
          <p className="text-gray-500 font-semibold">FirstName</p>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="p-5 rounded-xl h-[30px] border-[1px] border-gray-300 w-full max-w-[700px] text-lg mb-5"
          />
          <CountryDrawer />
          <p className="text-gray-500 font-semibold">LastName</p>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="p-5 rounded-xl h-[30px] border-[1px] border-gray-300 w-full max-w-[700px] text-lg mb-5"
          />
          <p className="text-gray-500 font-semibold">Password</p>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="p-5 rounded-xl h-[30px] border-[1px] border-gray-300 w-full max-w-[700px] text-lg mb-5"
          />
          <p className="text-gray-500 font-semibold">Confirm Password</p>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="p-5 rounded-xl h-[30px] border-[1px] border-gray-300 w-full max-w-[700px] text-lg mb-5"
          />
          <button
            type="submit"
            className="w-full bg-[#3671A8] text-white font-bold p-2 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
