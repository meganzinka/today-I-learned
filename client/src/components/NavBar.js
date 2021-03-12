import React from "react";
import {Link} from "react-router-dom"
const NavBar = () => {
  return (
    <div>
      <h1>Nav stuff</h1>
      <div id="navBar-container">
        <Link id="navBar-links" to={"/"}>
          Home
        </Link>
        <br></br>
        <Link to={"/facts"} id="navBar-links" path ={"/entries"} >
          View Entries
        </Link>
        <br></br>
        <Link id="navBar-links" path={"/entries/:objectid"} to={"/entries/:objectid"}>
          Edit Entries
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
