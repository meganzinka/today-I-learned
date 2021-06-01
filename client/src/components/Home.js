import React from "react";
import { useState, useEffect } from "react";
import Popup from "./Popup";

const Home = () => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [source, setSource] = useState();
  const [sendNewPost, setSendNewPost] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [scienceTag, setScienceTag] = useState(false);
  const [historyTag, setHistoryTag] = useState(false);
  const [artsTag, setArtsTag] = useState(false);
  const [politicsTag, setPoliticsTag] = useState(false);
  const [healthTag, setHealthTag] = useState(false);
  const [otherTag, setOtherTag] = useState(false);
  const [tag, setTag] = useState(["other"]);
  const [updateTags, setUpdateTags] = useState(false);

  function triggerPopUp(event) {
    setUpdateTags(true);
  }

  let tempArray = [];

  useEffect(() => {
    if (updateTags) {
      if (artsTag) {
        tempArray.push("arts");
      }
      if (scienceTag) {
        tempArray.push("science");
      }
      if (historyTag) {
        tempArray.push("history");
      }
      if (politicsTag) {
        tempArray.push("politics");
      }
      if (healthTag) {
        tempArray.push("health");
      }
      if (otherTag) {
        tempArray.push("other");
      }
      if (tempArray.length === 0) {
        tempArray.push("other");
      }
      setTag(tempArray);
      setSendNewPost(true);
      setUpdateTags(false);
    }
  });

  useEffect(() => {
    if (sendNewPost) {
      fetch(`/new-entry/${title}/${content}/${tag}/${source}`);
      setShowConfirmation(true);
      setSendNewPost(false);
    }
  });

  function setPost(event) {
    if (event.target.id === "new-post-title") {
      let newTitle = event.target.value;
      setTitle(newTitle.replace("/", "-"));
    } else if (event.target.id === "new-post-content") {
      let newContent = event.target.value;
      setContent(newContent.replace("/", "-"));
    } else if (event.target.id === "new-post-source") {
      setSource(event.target.value);
    } else if (event.target.name === "tag") {
      if (event.target.id === "science") {
        setScienceTag(!scienceTag);
      } else if (event.target.id === "arts") {
        setArtsTag(!artsTag);
      } else if (event.target.id === "history") {
        setHistoryTag(!historyTag);
      } else if (event.target.id === "politics") {
        setPoliticsTag(!politicsTag);
      } else if (event.target.id === "health") {
        setHealthTag(!healthTag);
      } else if (event.target.id === "other") {
        setOtherTag(!otherTag);
      }
    }
  }

  //add entry form with fields for title, content, tags, submit
  return (
    <div>
      <h1 className="page-header"> What did you learn today? </h1>
      <div className="label-container">
        <label>Title</label>
      </div>
      <form
      // method="POST" action ="/new-entry"
      >
        <input
          type="text"
          name="title"
          id="new-post-title"
          required
          onChange={setPost}
          value={title}
        />
        <div className="label-container">
          <label>Content</label>
        </div>
        <textarea
          type="text"
          name="content"
          id="new-post-content"
          required
          onChange={setPost}
          value={content}
        />
        <div className="label-container">
          <label>Source (paste URL here) </label>
        </div>
        <input
          type="text"
          name="source"
          id="new-post-source"
          required
          onChange={setPost}
          value={source}
        />
        <div className="label-container">
          <label>Tag(s): </label>
        </div>
        <div>
          <input
            type="checkbox"
            id="science"
            name="tag"
            value="science"
            onClick={setPost}
            checked={scienceTag}
          />
          <label for="science">science</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="history"
            name="tag"
            value="history"
            onClick={setPost}
            checked={historyTag}
          />
          <label for="history">history</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="politics"
            name="tag"
            value="politics"
            onClick={setPost}
            checked={politicsTag}
          />
          <label for="politics">politics</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="health"
            name="tag"
            value="health"
            onClick={setPost}
            checked={healthTag}
          />
          <label for="health">health</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="arts"
            name="tag"
            value="arts"
            onClick={setPost}
            checked={artsTag}
          />
          <label for="arts">arts</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="other"
            name="tag"
            value="other"
            onClick={setPost}
            checked={otherTag}
          />
          <label for="other">other</label>
        </div>
        <input name="date" type="hidden" />
        <input
          value="Submit"
          className="button"
          onClick={triggerPopUp}
          type="button"
        />
      </form>
      {showConfirmation ? (
        <Popup
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          tag={tag}
          setScienceTag={setScienceTag}
          setHistoryTag={setHistoryTag}
          setPoliticsTag={setPoliticsTag}
          setHealthTag={setHealthTag}
          setArtsTag={setArtsTag}
          setOtherTag={setOtherTag}
          source={source}
          setSource={setSource}
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
        ></Popup>
      ) : null}
    </div>
  );
};
export default Home;
