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
import NotFound from "./NotFound";
import Search from "./Search";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import AboutUs from "../pages/About"

function Layout(props) {
  return (
    <div className={`w-full font-sora`}>
      <Navbar isLoggedIn={props.isLoggedIn} handleLogout={props.handleLogout} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default function RoutesManager() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const connected = localStorage.getItem('connected');
    if (connected) {
      // console.log(connected)
      setIsLoggedIn(true);
    }
    // window.onbeforeunload = () => {
    //   localStorage.removeItem('connected');
    // };
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('connected');
    setIsLoggedIn(false);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="profile" element={<Profile />} />
          <Route path="search" element={<Search />} />
        </Route>
        <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='*' element={<NotFound />} />
        <Route path="map" element={<MapComponent />} />
      </Routes>
    </Router>
  );
}