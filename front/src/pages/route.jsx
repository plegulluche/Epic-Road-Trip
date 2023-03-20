import {
  Route,
  Routes,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "./login";
import MapComponent from "../components/MapComponent";
import { useEffect, useState } from "react";
import Register from "./register";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NotFound from "./NotFound";
import Search from "./Search";
import { About_us } from "./About";

function Footer() {
  return (
    <footer className="bg-[#344966] py-6 h-[140px] flex flex-col justify-between text-white">
      <div className=" w-full  px-8 sm:px-6  ">
        <nav className=" flex flex-wrap justify-between px-16" aria-label="Footer">
          <div className="px-5 py-2">
            <Link to="/" className=" text-white hover:text-gray-400 text-xs">
              Home
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/about" className=" text-white hover:text-gray-400 text-xs">
              About Us
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/contact" className=" text-white hover:text-gray-400 text-xs">
              Contact Us
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/terms" className=" text-white hover:text-gray-400 text-xs">
              Terms of Service
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link to="/privacy" className=" text-white hover:text-gray-400 text-xs">
              Privacy Policy
            </Link>
          </div>
        </nav>  
      </div>
      <div class="relative flex items-center mx-20 my-2">
        <div class="flex-grow border-t border-gray-400"></div>
      </div>
      <div className="flex flex-row justify-around">
          <img src="logo2.png" alt="Logo" className="hidden sm:block w-20" />
          <p className="flex justify-center items-center text-center text-white text-xs">&copy; 2023 Startek. All rights reserved.</p>
          <div className="flex flex-row items-center justify-center">
            <img src="twitter.png" alt="Logo" className="hidden sm:block w-6 h-6 mr-2" />
            <img src="insta.png" alt="Logo" className="hidden sm:block w-6 h-6" />
          </div>

        </div>
    </footer>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(window.location.pathname);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setSelected(window.location.pathname);
  }, [window.location.pathname]);

  return (
    <div>
      <div className="grid grid-cols-12 items-center px-4 xl:px-40 lg:px-28 md:px-20 px-10 relative z-50">
        <div className="flex items-center col-span-3">
          <NavLink to="/" className="text-indigo-500 font-semibold">
            <img
              src="NavbarLogo.png"
              alt="Logo"
              className="hidden sm:block w-[100px]"
            />
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
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto col-span-6`}
        >
          <div className="w-full h-10 flex items-center justify-center gap-8">
            <div
              className={`${
                selected === "/" ? "text-[#3671A8]" : "text-gray-400"
              } relative h-[30px] flex justify-center`}
            >
              <p className="hover:cursor-pointer font-semibold" onClick={() => navigate("/")}>
                Home
              </p>
              {selected === "/" && (
                <div className="absolute bottom-0 w-8 mt-1 h-1 bg-[#3671A8]"></div>
              )}
            </div>

            <div
              className={`${
                selected === "/profile" ? "text-[#3671A8]" : "text-gray-400"
              } relative h-[30px] flex justify-center`}
            >
              <p
                className="hover:cursor-pointer font-semibold"
                onClick={() => navigate("/profile")}
              >
                Profile
              </p>
              {selected === "/profile" && (
                <div className="absolute bottom-0 w-8 mt-1 h-1 bg-[#3671A8]"></div>
              )}
            </div>

            <div
              className={`${
                selected === "/about" ? "text-[#3671A8]" : "text-gray-400"
              } relative h-[30px] flex justify-center`}
            >
              <p
                className="hover:cursor-pointer font-semibold"
                onClick={() => navigate("/about")}
              >
                About us
              </p>
              {selected === "/about" && (
                <div className="absolute bottom-0 w-8 mt-1 h-1 bg-[#3671A8]"></div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-6 lg:pt-0 col-span-3 flex justify-end items-end">
          <a
            href="/login"
            className="inline-block py-2 px-4 text-[#3671A8] font-semibold rounded-lg mr-4 hover:brightness-50"
          >
            Log in
          </a>
          <a
            href="/register"
            className="inline-block py-2 px-8 text-white font-semibold rounded-lg bg-[#3671A8] hover:brightness-110"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <div className={`w-full font-sora`}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default function RoutesManager() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About_us />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path='*' element={<NotFound />}/>
        <Route path="map" element={<MapComponent />} />
      </Routes>
    </Router>
  );
}
