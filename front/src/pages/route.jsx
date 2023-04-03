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
          <Route path="about" element={<AboutUs />} />
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
