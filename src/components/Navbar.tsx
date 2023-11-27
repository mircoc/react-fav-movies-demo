import React from "react";
import "bootstrap/js/src/collapse.js";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <NavLink
          to={`/movie`}
          className="navbar-brand fs-2"
        >
          Fav<strong>Movies</strong>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div className="navbar-nav favmovie-navbar">
            <NavLink
              to={`/movie`}
              className={({ isActive, isPending }) =>
                isActive
                  ? "active nav-link"
                  : isPending
                  ? "pending nav-link"
                  : "nav-link"
              }
            >
              Top Rated
            </NavLink>
            <NavLink
              to={`/favorite`}
              className={({ isActive, isPending }) =>
                isActive
                  ? "active nav-link"
                  : isPending
                  ? "pending nav-link"
                  : "nav-link"
              }
            >
              Favorites
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
