import React from "react";

const Home = () => {
  //add entry form with fields for title, content, tags, submit
  return (
    <div>
      <h1 class="page-header"> What did you learn today? </h1>
      <form action="/post" method="POST">
        <div className="label-container">
          <label>Title</label>
        </div>
        <input type="text" name="title" id="new-post-title" required />
        <div className="label-container">
          <label>Content</label>
        </div>
        <textarea type="text" name="content" id="new-post-content" required />
        <div className="label-container">
          <label>Source (paste URL here) </label>
        </div>
        <input type="text" name="source" id="new-post-title" required />
        <div className="label-container">
          <label>Tag(s): </label>
        </div>
        <div>
          <input type="checkbox" id="science" name="tag" value="science" />
          <label for="science">science</label>
        </div>
        <div>
          <input type="checkbox" id="history" name="tag" value="history" />
          <label for="history">history</label>
        </div>
        <div>
          <input type="checkbox" id="politics" name="tag" value="politics" />
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
        <input name="date" type="hidden" />
        <input
          type="submit"
          value="Submit"
          class="button"
          onSubmit={alert("Thanks for your submission!")}
        />
      </form>
    </div>
  );
};
export default Home;
