import React from "react";
import {Link} from "react-router-dom"
const NavBar = () => {
  //side-bar directory to lead to all entries & add entry pages 
  return (
    <div>
      <header class = "page-header">
        <h1>Directory</h1>
      </header>
      <div id="navBar-container">
        <Link class="navBar-links" to={"/"}>
          Add Entry
        </Link>
        <br></br>
        <Link to={"/facts"} class="navBar-links" path={"/facts"}>
          View Entries
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
