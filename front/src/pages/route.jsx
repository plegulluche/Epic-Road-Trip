import { Route, Routes, BrowserRouter as Router, Outlet } from "react-router-dom";
import Home from "../pages/Home"
import About from "../pages/About"
import Profile from "../pages/Profile"
import Login from "./login";
import Register from "./register";

function Navbar() {
  return (
    <div className="w-full bg-gray-300 h-[60px]">

    </div>
  )
}

function Layout() {
  return (
    <div className="w-full px-40 font-sora">
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
