import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Entries = () => {
  const [loadEntries, setLoadEntries] = useState(true);
  const [entryArray, setEntryArray] = useState([]);
  const [chosenTag, setChosenTag] = useState("all");

  useEffect(() => {
    //fetch all entries from back-end if we haven't already
    if (loadEntries) {
      fetch("/showall")
        .then((res) => res.json())
        .then((list) => {
          let array = [];
          //take each entry object and put it into a list 
          list.forEach((item) => {
            array.push(item);
          });
          //make the list the entry array 
          setEntryArray(array);
        });
    }
    setLoadEntries(false);
  });

  //set the tag to show only entries of a certain tag 
  function changeTag(event) {
    let newTag = event.target.id;
    setChosenTag(newTag);
  }

  // Create a link for each tag which will filter to only those entries with the tag
  return (
    <div >
      <h1 class="page-header">TIL Entries</h1>
      <h4>Search by Tag</h4>
      <div class="tag-bar">
        <Link class="tag-link" onClick={changeTag} to={`/facts`} id="all">
          Show All
        </Link>
        <Link class="tag-link" onClick={changeTag} to={`/facts`} id="science">
          Science
        </Link>
        <Link onClick={changeTag} class="tag-link" to={`/facts`} id="history">
          History
        </Link>
        <Link onClick={changeTag} class="tag-link" to={`/facts`} id="politics">
          Politics
        </Link>
        <Link onClick={changeTag} class="tag-link" to={`/facts`} id="health">
          Health
        </Link>
        <Link onClick={changeTag} class="tag-link" to={`/facts`} id="arts">
          Arts
        </Link>
        <Link onClick={changeTag} class="tag-link" to={`/facts`} id="other">
          Other
        </Link>
      </div>
      {/* If a tag has not been chosen, show all entries - map thrhough each item, show title, map through each tag, show content, link to edit/delete */}
      {entryArray.map((obj, index) => {
        if (chosenTag === "all") {
          return (
            <div id="entry" key={index}>
              <h4>{obj.title}</h4>
              <h5>Tags:</h5>
              {obj.tag.map((item) => {
                return <h5> {item} </h5>;
              })}
              <p>{obj.content}</p>
              <p>Posted on: {obj.date}</p>
              <Link to={`/facts/${obj._id}`}>
                <button class = "button">Edit/Delete</button>
              </Link>
            </div>
          );
          // If a tag has been chosen, then do the same but only on entries with the chosen tag
        } else {
          if (obj.tag.includes(chosenTag)) {
            return (
              <div id="entry" key={index}>
                <h4>{obj.title}</h4>
                <h5>Tags:</h5>
                {obj.tag.map((item) => {
                  return <h5> {item} </h5>;
                })}
                <p>{obj.content}</p>
                <p>Posted on: {obj.date}</p>
                <Link to={`/facts/${obj._id}`}>
                  <button class="button">Edit/Delete</button>
                </Link>
              </div>
            );
          } else return null;
        }
      })}
    </div>
  );
};

export default Entries;
