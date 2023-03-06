import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home"
import About from "../pages/about/About"
import Profile from "../pages/profile/Profile"
const Root = () => {
  return (
          <Routes>
                  
                  <Route path="/" element={ <Home/> } />
                  <Route path="about" element={ <About/> } />
                  <Route path="profile" element={ <Profile/> } />


              
          </Routes>
  );
};
export default Root;