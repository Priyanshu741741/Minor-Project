import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-primary">
          College Dispensary
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/appointment">Book Appointment</Link></li>
          <li><Link to="/doctor">Doctor Dashboard</Link></li>
          <li><Link to="/patient">Patient Dashboard</Link></li>
          <li><Link to="/alerts">NLP Alerts</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
