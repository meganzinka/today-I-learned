import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EditAndDelete = (props) => {
  const [loadEntry, setLoadEntry] = useState(true);
  const [entry, setEntry] = useState();
  const [deleteEntry, setDeleteEntry] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(false);
  const [edit, setEdit] = useState(false);

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
      console.log("inside else if");
      //if user wants to delete, set deleteEntry to true and fetch
      fetch(`/delete/${props.match.params.objectid}`);
      setDeleteEntry(false);
    }
  });

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
      setEdit(false);
    } else setEdit(event.target.value);
  }

  //if the user clicks on delete, it will show this delete message
  if (deleteMessage) {
    return (
      <div>
        <div class="message-wrapper">
          <div class="message">
            <h1>Are you sure you want to delete this entry?</h1>
            <button onClick={setDelete}>Delete</button>
            <button onClick={deleteMessageFun}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  //if there is an entry and the user hasn't clicked edit or delete, show the entry w/ title, tags, content, options to delete and edit
  else if (entry && !edit) {
    return (
      <div id="edit-entry">
        <h1>Edit an Entry</h1>
        <h4 class="edit-item">{entry.title}</h4>
        <button value="title" onClick={editMessage}>
          Edit Title
        </button>
        <br></br>
        <h5 class="edit-item">Tags:</h5>
        {entry.tag.map((item) => {
          return <h5> {item} </h5>;
        })}
        <br></br>
        <button onClick={editMessage} value="tags">
          Edit Tags
        </button>
        <p class="edit-item">{entry.content}</p>
        <button onClick={editMessage} value="content">
          Edit Content
        </button>
        <br></br>
        <button onClick={deleteMessageFun}>Delete Entry</button>
      </div>
    );
    //if user hits "edit" --- this part is not finished
  } else if (edit) {
    return (
      <div>
        <div class="message-wrapper">
          <div class="message">
            {/* //create a form to submit edits  */}
            <form action={`edit/${props.match.params.objectid}`} method="post">
              {/* Show the area that the user said they want to edit & allow a space for them to write in edits */}
              <h1>Edit {edit}</h1>
              <p>Current text: {entry[edit]}</p>
              <label>Desired text</label>
              <textarea type="text" name="update" />
              <input display="none" name="category" value={edit} />
              <input type="submit" value="Submit" />
              <button onClick={editMessage}>Cancel</button>
            </form>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default EditAndDelete;
