import React from "react";
import { useEffect, useState } from "react";
import "./../style/EditAndDelete.css"

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
          console.log(object)
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

  function displayCurrentContent (editField) {
  }

  //if the user clicks on delete, it will show this delete message
  if (deleteMessage) {
    return (
      <div>
        <div className="message-wrapper">
          <div className="message">
            <h1>Are you sure you want to delete this entry?</h1>
            <button className="button" onClick={setDelete}>
              Delete
            </button>
            <button className="button" onClick={deleteMessageFun}>
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
        <h1 Name = "page-header">Edit an Entry</h1>
        <h4 className="edit-item">{entry.title}</h4>
        <br></br>
        <h5 className="edit-item">Tags:</h5>
        {entry.tag.map((item, index) => {
          return <h5 key ={index}> {item} </h5>;
        })}
        <br></br>
        <p className="edit-item">{entry.content}</p>
        <button className="button" onClick={editMessage} value="content">
          Edit Entry
        </button>
        <br></br>
        <button className="button" onClick={deleteMessageFun}>
          Delete Entry
        </button>
      </div>
    );
    //if user hits "edit" --- this part is not finished
  } else if (editMode) {
    return (
      <div>
        <div className="message-wrapper">
          <div className="message">
            {/* //create a form to submit edits  */}
            <form action={`/edit/${props.match.params.objectid}`} method="post">
              {/* Show the area that the user said they want to edit & allow a space for them to write in edits */}
              <h1 className="popup-header">Edit Entry</h1>
              <div id="edit-info">
                Edit Title:
                <input
                  id="edit-title"
                  type="text"
                  name="update"
                  defaultValue={entry.title}
                />
                <br></br>
                Edit Content:
                <input
                  id="edit-content"
                  type="text"
                  name="update"
                  defaultValue={entry.content}
                />
                <div>
                  Edit Tag:
                  <br></br>
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
                  <input
                    type="checkbox"
                    id="health"
                    name="tag"
                    value="health"
                  />
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
                <input className="button" type="submit" value="Submit" />
                <button className="button" onClick={editMessage}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else return null;
};

export default EditAndDelete;
