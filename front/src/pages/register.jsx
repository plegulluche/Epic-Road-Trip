import React from "react";
import { useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import requests from "../requests/Requests";
import { signUp } from "../requests/axiosMethods/Auth";

const CountryDrawer = ({ setCountry }) => {

  const handleSelect = (event) => {
    setCountry(event.target.value);

  };

  return (
    <div class="mb-5">
      <p className="text-gray-500 font-semibold">Country</p>
      <div class="w-full h-10 pl-4 border border-gray-300 rounded-xl">
        <select class="text-gray-700 bg-transparent w-full h-full" id="country" onchange="handleSelect()">
          <option value="" disabled selected>Select a country</option>
          <option value="United States">United States</option>
          <option value="France">France</option>
          <option value="Canada">Canada</option>
          <option value="Germany">Germany</option>
          <option value="Japan">Japan</option>
          <option value="England">England</option>
        </select>
      </div>
    </div>
  );
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [country, setCountry] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [user, setUser] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("country:", country);
    signUp(requests.Register, { email, password, firstName, lastName, country })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const registerGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

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
        <div>
          <button
            className="w-full bg-[#3671A8] text-white font-bold p-2 rounded"
            onClick={() => registerGoogle()}>Sign up with Google &nbsp;&nbsp;&nbsp;🚀
          </button>
        </div>
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
          <p className="text-gray-500 font-semibold">First Name</p>
          <input
            type="text"
            id="firstName-input"
            value={firstName}
            onChange={(event) => setfirstName(event.target.value)}
            required
            className="p-5 rounded-xl h-[30px] border-[1px] border-gray-300 w-full max-w-[700px] text-lg mb-5"
          />
          <p className="text-gray-500 font-semibold">Last Name</p>
          <input
            type="text"
            id="lastName-input"
            value={lastName}
            onChange={(event) => setlastName(event.target.value)}
            required
            className="p-5 rounded-xl h-[30px] border-[1px] border-gray-300 w-full max-w-[700px] text-lg mb-5"
          />
          <CountryDrawer setCountry={setCountry} />
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
            id="verifyPassword-input"
            value={verifyPassword}
            onChange={(event) => setVerifyPassword(event.target.value)}
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