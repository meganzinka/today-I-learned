import React from "react";
import dancing from "./../images/dancing.gif"
import {Link} from "react-router-dom"

const PopUp = (props) => {
  console.log(props.tag)
  
  //hide the popup when user clicks the X in corner
  function clearPost(event) {
    props.setTitle("")
    props.setContent("")
    props.setSource("")
    props.setShowConfirmation(false);
    props.setScienceTag(false)
    props.setHistoryTag(false)
    props.setPoliticsTag(false)
    props.setArtsTag(false)
    props.setHealthTag(false)
    props.setOtherTag(false)
  }

  if (props.setShowConfirmation) {
    return (
      <div
        className="popup-wrapper"
        style={
          props.setShowConfirmation ? { display: "flex" } : { display: "none" }
        }
      >
        <div className="popup">
          <div id="top-popup">
            <img id="dancing" src={dancing} alt="dancing person" />
            <div id="popup-title">Thanks for your submission!</div>
            <span>
              <b> Title:</b> {props.title}
            </span>
            <span>
              <b>Content:</b> {props.content}
            </span>
            <span>
              <b>Source:</b> <a href ={props.source}> Click Here </a>
            </span>
            <span>
              <b>Tags:</b> {props.tag.toString()}
            </span>
          </div>

          <div id="bottom-popup">
            <Link to="/facts">
              <button className="button" onClick={clearPost}>
                View All Entries
              </button>
            </Link>
            <Link to="/">
              <button className="button" onClick={clearPost}>
                Add Another Entry
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default PopUp;
