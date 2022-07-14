import React, { useEffect, useState } from "react";

const Navbar = ({ imageLoading, imgUrl, title }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (typeof imageLoading === "function") {
      imageLoading(false);
    }
  }, [imageLoaded, imageLoading]);

  return (
      <li
        className={this.state.navBar ? "nav-item active-nav-item" : "nav-item"}
        key={route}
      >
        {/* Highlights navbar if user is on that page (red line on yellow nav bar) */}
        {this.state.navBar ? (
          <NavLink
            exact
            to={this.routes[route][0]}
            activeClassName="highlight-nav-no-drop"
          >
            {this.routes[route][1]}
          </NavLink>
        ) : (
          <NavLink
            exact
            to={this.routes[route][0]}
            activeClassName="highlight-nav-white"
          >
            {this.routes[route][1]}
          </NavLink>
        )}
      </li>
  );
};

export default Navbar;
