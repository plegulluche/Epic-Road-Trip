import React from "react";
import { useState } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import {Helmet} from "react-helmet";
import requests from "../requests/Requests";
import { signIn } from "../requests/axiosMethods/Auth";

const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div className="text-red-500 mb-2 text-[1.1rem] -mt-5">{message}</div>;
};

const ShowIcon = () => {
  return (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
      <path d="M12 14a2 2 0 100-4 2 2 0 000 4z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  );
}

const HideIcon = () => {
  return (
    <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
      <path d="M3 3l18 18M10.5 10.677a2 2 0 002.823 2.823" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
      <path d="M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.991 5.282 6 9 6 1.55 0 3.043-.523 4.395-1.35M12 6c4.008 0 6.701 3.158 9 6a15.66 15.66 0 01-1.078 1.5" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  )
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsEmailValid(true);
    setIsPasswordValid(true);
    signIn(requests.Login, { email, password })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
        if (error.response.data.errors.email === "") {
          setErrorMessage(error.response.data.errors.password)
          setIsPasswordValid(false)
        } else {
          setErrorMessage(error.response.data.errors.email)
          setIsEmailValid(false)
        }
      })
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
          <ErrorMessage message={!isEmailValid && errorMessage} />
          <p className="text-gray-500 font-semibold">Password</p>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="p-5 rounded-xl h-[30px] border-[1px] border-gray-300 w-full max-w-[700px] text-lg mb-5"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-[35%] right-3 transform -translate-y-1/2"
            >
              {showPassword ? <HideIcon /> : <ShowIcon />}
            </button>
          </div>
          <ErrorMessage message={!isPasswordValid && errorMessage} />
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
