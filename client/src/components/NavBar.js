import React from "react";
import { Link } from "react-router-dom";
import allEntries from "./../images/allEntries.png"
import newEntry from "./../images/newEntry.png";


const NavBar = () => {
  //side-bar directory to lead to all entries & add entry pages
  return (
    <div id="navBar-container">
      <center>
        <h3>
          Navigation
        </h3>
        <Link className="nav-bar-links" to="/">
          <img id="nav-icon" src={newEntry} alt="box with plus sign" />
          New Entry
        </Link>
        <Link className="nav-bar-links" to="/facts">
          <img id="nav-icon" src={allEntries} alt="box with plus sign" />
          All Entries
        </Link>
      </center>
    </div>
  );
};

export default NavBar;
