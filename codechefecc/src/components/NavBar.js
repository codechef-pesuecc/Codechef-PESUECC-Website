import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './NavBar.css';
import logo from "./CodeChefLOGO.png"
import ThemeButton from './ThemeButton';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/board">Leaderboard</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/members">Members</Link></li>
        <l1><ThemeButton/></l1>
      </ul>
    </nav>
  );
}

export default Navbar;