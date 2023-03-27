import React from "react";
import { useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import {Helmet} from "react-helmet";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Add your login logic here
  };
  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  return (
    <div className="flex h-screen font-sora">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Startek Agency</title>
          <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-[40%] flex items-center justify-center bg-blue-300">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img src="/plane.png" alt="Logo" className="h-[55%]" />
          <div className="text-5xl text-[#2D2D2D] font-bold text-center">
            Ready to take off ?
          </div>
        </div>
      </div>
      <div className="w-[60%] flex flex-col items-center justify-center">
        <img src="/logo.png" alt="Right Panel Logo" className="w-auto h-auto" />
        <div>
          <button
            className="w-full bg-[#3671A8] text-white font-bold p-2 rounded"
            onClick={() => loginGoogle()}>Sign in with Google &nbsp;&nbsp;&nbsp;🚀
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
          <p className="text-gray-500 font-semibold">Password</p>
          <input
            type="password"
            id="password-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="p-5 rounded-xl h-[30px] border-[1px] border-gray-300 w-full max-w-[700px] text-lg mb-10"
          />
          <button
            type="submit"
            className="w-full bg-[#3671A8] text-white font-bold p-2 rounded"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
