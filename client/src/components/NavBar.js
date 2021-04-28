import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  //side-bar directory to lead to all entries & add entry pages
  return (
    <div id="navBar-container">
      <header id="directory-header">Directory</header>
      <Link class="nav-bar-links" to="/">
        Submit Entry
      </Link>
      <Link class="nav-bar-links" to="/facts">
        View All Entries
      </Link>
    </div>
  );
};

export default NavBar;
