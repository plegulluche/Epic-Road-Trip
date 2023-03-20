import { Link } from "react-router-dom";

export default function Footer() {
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