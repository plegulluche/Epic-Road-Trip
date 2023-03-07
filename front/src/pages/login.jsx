import React from "react";
import { useState } from "react";


const styles = {
    container: {
        display: 'flex',
        height: '100vh',
    },
    leftPanel: {
        flex: '0 0 40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${process.env.PUBLIC_URL}/auth_image.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    logo: {
        maxWidth: '90%',
        maxHeight: '90%',
        width: '90%',
        height: '90%',
    },
    logoText: {
        fontSize: 'calc(4vh + 1rem)',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2D2D2D',
    },
    rightPanel: {
        flex: '2 1 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rightPanelLogo: {
        maxWidth: '350px',
        maxHeight: '100%',
        width: 'auto',
        height: 'auto',
        marginBottom: '3rem',
    },
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
    <div className="flex h-screen">
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

const formStyle = {
    borderRadius: '5px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '700px',
};

const inputStyle = {
    margin: '10px 0 30px 0',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #AFAFAF',
    width: '100%',
    maxWidth: '700px',
    boxSizing: 'border-box',
    fontSize: '16px',
    color: '#787878',
};

const buttonStyle = {
    width: '100%',
    backgroundColor: '#3671A8',
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
};