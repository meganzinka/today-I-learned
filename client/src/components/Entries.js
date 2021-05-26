import React from "react";
import { useState, useEffect } from "react";
import linkIcon from "../images/link.png";
import editIcon from "./../images/edit.png";
import deleteIcon from "./../images/DELETE.png";

const Entries = (props) => {
  const [loadEntries, setLoadEntries] = useState(true);
  const [entryArray, setEntryArray] = useState([]);
  const [chosenTag, setChosenTag] = useState("all");
  const [entry, setEntry] = useState();
  const [deleteEntry, setDeleteEntry] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [id, setId] = useState();
  const [editId, setEditId] = useState()

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
      setLoadEntries(false);
    } else if (deleteEntry) {
      console.log(deleteEntry);
      //if user wants to delete, set deleteEntry to true and fetch
      fetch(`/delete/${id}`);
      setDeleteEntry(false);
    }
  });

  useEffect (() => {
    if (editId) {
    for (let i = 0; i < entryArray.length; i++) {
      console.log(entryArray[i])
      if (entryArray[i]._id === editId) {
          setEntry(entryArray[i]);
          break; 
        }
      }
      setEditMode(true)
    }
  }, [editId])

  function parseDate(obj) {
    let time;
    let hour = +obj.date.slice(11, 13);
    if (hour > 12) {
      hour = hour - 12;
      time = `${hour}:${obj.date.slice(14, 16)} PM`;
    } else if (hour < 12) {
      time = `${hour}:${obj.date.slice(14, 16)} AM`;
    }
    let parsedDate = `${obj.date.slice(5, 7)}/${obj.date.slice(
      8,
      10
    )}/${obj.date.slice(0, 4)} at ${time}`;
    return parsedDate;
  }

  //set the tag to show only entries of a certain tag
  function changeTag(event) {
    let newTag = event.target.id;
    setChosenTag(newTag);
  }


  //use when user confirms that they want to delete entry
  function setDelete(event) {
    setDeleteEntry(true);
    setDeleteMessage(false);
    window.location.reload(); 
  }

  //used to show and hide the delete entry pop-up
  function deleteMessageFun(event) {
    setDeleteMessage(!deleteMessage);
    if (!deleteMessage) {
      setId(event.target.id);
      setDeleteMessage(true);
    } else setDeleteMessage(false);
  }

  //used to show and hide the edit entry pop-up
  function editMessage(event) {
    if (event.target.id === "cancel-button") {
      console.log("inside if cancel");
      setEditMode(false);
    } else {
      console.log("inside else");
      console.log(editMode)
      console.log(entry)
      console.log(editId)
      setEditId(event.target.id);
      }
    }
  
  function updateEntry(event) { 
    window.location.reload(); 
  }

  // Create a link for each tag which will filter to only those entries with the tag
  if (deleteMessage) {
    return (
      <div>
        <div className="message-wrapper">
          <div className="message">
            <div id="delete-message">
              Are you sure you want to delete this entry?
            </div>
            <div id="cancel-button-container">
              <button className="button" onClick={setDelete}>
                Delete
              </button>
              <button className="button" onClick={deleteMessageFun}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (editMode && entry) {
    return (
      <div
        className="popup-wrapper"
        style={editMode ? { display: "flex" } : { display: "none" }}
      >
        <div id="edit-popup">
          <form action={`/edit/${editId}`} method="post">
            <div id="top-edit-popup">
              <div id="popup-title">Edit Entry</div>
              Edit Title:
              <input
                id="edit-title"
                type="text"
                name="title"
                defaultValue={entry.title}
              />
              <br></br>
              <br></br>
              Edit Content:
              <textarea
                id="edit-content"
                type="text"
                name="content"
                defaultValue={entry.content}
              />
              <br></br>
              <br></br>
              Edit Source
              <input
                id="edit-source"
                type="text"
                name="link"
                defaultValue={entry.link}
              />
              <br></br>
              <br></br>
              Edit Tag:
              <br></br>
              <div>
                <input
                  type="checkbox"
                  id="science"
                  name="tag"
                  value="science"
                />
                <label for="science">science</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="history"
                  name="tag"
                  value="history"
                />
                <label for="history">history</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="politics"
                  name="tag"
                  value="politics"
                />
                <label for="politics">politics</label>
              </div>
              <div>
                <input type="checkbox" id="health" name="tag" value="health" />
                <label for="health">health</label>
              </div>
              <div>
                <input type="checkbox" id="arts" name="tag" value="arts" />
                <label for="arts">arts</label>
              </div>
              <div>
                <input type="checkbox" id="other" name="tag" value="other" />
                <label for="other">other</label>
              </div>
              <br></br>
            </div>

            <div id="bottom-edit-popup">
              <div id ="edit-button-container">
              <input className="button" type="submit" value="Submit" onClick={updateEntry}/>
              <button
                className="button"
                id="cancel-button"
                onClick={editMessage}
              >
                Cancel
              </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <h1 className="page-header">TIL Entries</h1>
        <div className="tag-bar">
          <div className="tag-link" onClick={changeTag} to={`/facts`} id="all">
            All
          </div>
          {chosenTag === "science" ? (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="science"
              style={{ backgroundColor: "#516f90" }}
            >
              Science
            </div>
          ) : (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="science"
              style={{ backgroundColor: "#f5c26b" }}
            >
              Science
            </div>
          )}
          {chosenTag === "history" ? (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="history"
              style={{ backgroundColor: "#516f90" }}
            >
              History
            </div>
          ) : (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="history"
              style={{ backgroundColor: "#f5c26b" }}
            >
              History
            </div>
          )}
          {chosenTag === "politics" ? (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="politics"
              style={{ backgroundColor: "#516f90" }}
            >
              politics
            </div>
          ) : (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="politics"
              style={{ backgroundColor: "#f5c26b" }}
            >
              politics
            </div>
          )}
          {chosenTag === "health" ? (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="health"
              style={{ backgroundColor: "#516f90" }}
            >
              health
            </div>
          ) : (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="health"
              style={{ backgroundColor: "#f5c26b" }}
            >
              health
            </div>
          )}
          {chosenTag === "arts" ? (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="arts"
              style={{ backgroundColor: "#516f90" }}
            >
              arts
            </div>
          ) : (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="arts"
              style={{ backgroundColor: "#f5c26b" }}
            >
              arts
            </div>
          )}
          {chosenTag === "other" ? (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="other"
              style={{ backgroundColor: "#516f90" }}
            >
              other
            </div>
          ) : (
            <div
              className="tag-link"
              onClick={changeTag}
              to={`/facts`}
              id="other"
              style={{ backgroundColor: "#f5c26b" }}
            >
              other
            </div>
          )}
        </div>

        {entryArray.map((obj, index) => {
          if (chosenTag === "all") {
            return (
              <div id="entry" key={index}>
                <div id="entry-title">
                  {obj.title}
                  <a href={obj.link} target="blank">
                    <img id="link-icon" src={linkIcon} alt="paperclip" />
                  </a>
                </div>
                <div id="content">{obj.content}</div>
                <div id="bottom-entry-container">
                  <div id="date-container">Posted on: {parseDate(obj)}</div>
                  <div id="button-container">
                    <button
                      className="button"
                      onClick={editMessage}
                      id={obj._id}
                    >
                      <img className="button-icon" src={editIcon} alt="file" />
                      Edit Entry
                    </button>
                    <button
                      id={obj._id}
                      className="button"
                      onClick={deleteMessageFun}
                    >
                      <img
                        className="button-icon"
                        src={deleteIcon}
                        alt="file with X on it"
                      />
                      Delete Entry
                    </button>
                  </div>
                </div>
              </div>
            );
            // If a tag has been chosen, then do the same but only on entries with the chosen tag
          } else {
            if (obj.tag[0].includes(chosenTag)) {
              return (
                <div id="entry" key={index}>
                  <div id="entry-title">
                    {obj.title}
                    <a href={obj.link} target="blank">
                      <img id="link-icon" src={linkIcon} alt="paperclip" />
                    </a>
                  </div>
                  <div id="content">{obj.content}</div>
                  <div id="bottom-entry-container">
                    <div id="date-container">Posted on: {parseDate(obj)}</div>
                    <div id="button-container">
                      <button
                        className="button"
                        onClick={editMessage}
                        id={obj._id}
                      >
                        <img
                          className="button-icon"
                          src={editIcon}
                          alt="file"
                        />
                        Edit Entry
                      </button>
                      <button
                        id={obj._id}
                        className="button"
                        onClick={deleteMessageFun}
                      >
                        <img
                          className="button-icon"
                          src={deleteIcon}
                          alt="file with X on it"
                        />
                        Delete Entry
                      </button>
                    </div>
                  </div>
                </div>
              );
            } else return null;
          }
        })}
      </div>
    );
};

export default Entries;
