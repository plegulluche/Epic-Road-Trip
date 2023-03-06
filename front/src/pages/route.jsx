import { Route, Routes, BrowserRouter as Router, Outlet } from "react-router-dom";
import Home from "../pages/Home"
import About from "../pages/About"
import Profile from "../pages/Profile"
import Login from "./login";
import { useState } from "react";
import Register from "./register";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-300">
      <nav className="flex flex-wrap items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center flex-shrink-0 mr-6">
          <NavLink to="/" className="text-indigo-500 font-semibold">
          
          <img src="NavbarLogo.png" alt="Logo" className="hidden sm:block w-20" />
          </NavLink>
        </div>
        <div className="block lg:hidden">
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-black hover:border-black"
            onClick={toggleMenu}
          >
            <svg
              className="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <ul className="pt-6 lg:pt-0 lg:flex-grow lg:flex lg:justify-center">
            <li>
              <NavLink
                to="/"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-black mr-8"
                activeClassName="text-indigo-500"
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-black mr-8"
                activeClassName="text-indigo-500"
                onClick={toggleMenu}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-500 hover:text-black"
                activeClassName="text-indigo-500"
                onClick={toggleMenu}
              >
                About Us
              </NavLink>
            </li>
          </ul>
          <div className="pt-6 lg:pt-0">
            <a
              href="/login"
              className="inline-block py-2 px-4 text-blue-500 font-semibold rounded-lg hover:bg-blue-500 hover:text-white mr-4"
            >
              Login
            </a>
            <a
              href="/signup"
              className="inline-block py-2 px-4 text-white font-semibold rounded-lg bg-blue-500 hover:bg-white hover:text-blue-500 border-2 border-blue-500"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

function Layout() {
  return (
    <div className="w-full xl:px-40 lg:px-28 md:px-20 px-10 font-sora">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default function RoutesManager() {
  return (
        <Router>   
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={ <Home/> } />
                    <Route path="about" element={ <About/> } />
                    <Route path="profile" element={ <Profile/> } />
                    <Route path="login" element={ <Login/> } />
                    <Route path="register" element={ <Register/> } />
                  </Route>
                </Routes>               
          </Router>
  );
};
