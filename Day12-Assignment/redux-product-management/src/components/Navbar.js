import React from 'react';
import { Link, NavLink } from 'react-router-dom';

/**
 * Navbar Component
 * Renders a Bootstrap Navbar with navigation links.
 */
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Brand name linked to home */}
        <Link className="navbar-brand" to="/">E-Commerce</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* Navbar links */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishlist">Wishlist</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
