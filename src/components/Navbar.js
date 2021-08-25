import React from "react";

const Navbar = () => {
  return (
    <div className="navContainer">
      <nav
        class="navbar is-warning has-shadow is-spaced"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <a class="navbar-item" href="https://bulma.io">
            <img
              src="https://mckeeper.s3.us-east-2.amazonaws.com/mckeeper_logo.png"
              alt="site logo"
              style={{ maxHeight: "60px", padding:'0', margin:'0' }}
            />
          </a>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">Home</a>

            <a class="navbar-item">Documentation</a>

            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">More</a>

              <div class="navbar-dropdown">
                <a class="navbar-item">About</a>
                <a class="navbar-item">Jobs</a>
                <a class="navbar-item">Contact</a>
                <hr class="navbar-divider" />
                <a class="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>

          <div class="navbar-end">
            <div class="navbar-item">
                <a class="button is-info">Log out</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
