import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
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