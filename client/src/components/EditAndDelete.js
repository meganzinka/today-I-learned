import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditAndDelete = (props) => {
  const [loadEntry, setLoadEntry] = useState(true);
  const [entry, setEntry] = useState();
  const [deleteEntry, setDeleteEntry] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [editField, setEditField] = useState("title");
  const [editMode, setEditMode] = useState(false)
  const [editContent, setEditContent] = useState("")

  //use setLoadentry to load the single entry and stop fetch
  useEffect(() => {
    if (loadEntry) {
      fetch(`/show/${props.match.params.objectid}`)
        .then((res) => res.json())
        .then((object) => {
          setEntry(object);
        });
      setLoadEntry(false);
    } else if (deleteEntry) {
      //if user wants to delete, set deleteEntry to true and fetch
      fetch(`/delete/${props.match.params.objectid}`);
      setDeleteEntry(false);
    }
  });

  //capitalize field 
  function capitalize (word) {
        let newWord = word.toString().toLowerCase().trim();
        let newFirst = newWord[0].toUpperCase()
        return newFirst + newWord.slice(1)
  }

  //use when user confirms that they want to delete entry
  function setDelete(event) {
    setDeleteEntry(true);
    setDeleteMessage(false);
  }

  //used to show and hide the delete entry pop-up
  function deleteMessageFun(event) {
    setDeleteMessage(!deleteMessage);
  }

  //used to show and hide the edit entry pop-up
  function editMessage(event) {
    if (event.target.value === "cancel") {
      setEditMode(false);
    } else setEditMode(true);
  }

  function selectCategory (event) {
    setEditField(event.target.value);
    setEditContent(entry[editField]);
    console.log("in selectCategory function", editField);
  }
  console.log("editField:", editField)
  {entry ? console.log("entry[editfield]:", entry[editField]) : null}

  function displayCurrentContent (editField) {
  }

  //if the user clicks on delete, it will show this delete message
  if (deleteMessage) {
    return (
      <div>
        <div class="message-wrapper">
          <div class="message">
            <h1>Are you sure you want to delete this entry?</h1>
            <button class="button" onClick={setDelete}>
              Delete
            </button>
            <button class="button" onClick={deleteMessageFun}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
  //if there is an entry and the user hasn't clicked edit or delete, show the entry w/ title, tags, content, options to delete and edit
  else if (entry && !editMode) {
    return (
      <div>
        <h1 class = "page-header">Edit an Entry</h1>
        <h4 class="edit-item">{entry.title}</h4>
        <br></br>
        <h5 class="edit-item">Tags:</h5>
        {entry.tag.map((item) => {
          return <h5> {item} </h5>;
        })}
        <br></br>
        <p class="edit-item">{entry.content}</p>
        <button class="button" onClick={editMessage} value="content">
          Edit Entry
        </button>
        <br></br>
        <button class="button" onClick={deleteMessageFun}>
          Delete Entry
        </button>
      </div>
    );
    //if user hits "edit" --- this part is not finished
  } else if (editMode) {
    return (
      <div>
        <div class="message-wrapper">
          <div class="message">
            {/* //create a form to submit edits  */}
            <form action={`/edit/${props.match.params.objectid}`} method="post">
              {/* Show the area that the user said they want to edit & allow a space for them to write in edits */}
              <h1 class="popup-header">Edit {capitalize(editField)}</h1>
              <div id="choose-edit-field">
                <label>Edit:</label>
                <select name="category" onChange={selectCategory}>
                  <option value="title">Title</option>
                  <option value="tag">Tag</option>
                  <option value="content">Content</option>
                </select>
              </div>
              {editField === "tag" ? (
                <div>
                  <h5>Current {editField}:</h5>
                  <p>{entry[editField]}</p>
                  <select name="update">
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="politics">Politics</option>
                    <option value="health">Health</option>
                    <option value="arts">Arts</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              ) : (
                <div>
                  <h5>Current {editField}:</h5>
                  <p>{entry[editField]}</p>
                  <textarea id="edit-box" type="text" name="update" />
                </div>
              )}
              <br></br>
              <input class="button" type="submit" value="Submit" />
              <button class="button" onClick={editMessage}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default EditAndDelete;
