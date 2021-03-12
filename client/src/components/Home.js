import React from "react";
import { useState, useEffect } from "react";

const Home = () => {
    function submitDate () {
        console.log(Date.now())
        return Date.now()
    }


  return (
    <div>
      <h1> Home Page add entry </h1>
      <form action="/post" method="POST">
        <label>Post Title</label>
        <input type="text" name="title" id="title" />
        <label>Post Content</label>
        <textarea type="text" name="content" id="content" />
        <div>
          <input type="checkbox" id="science" name="tag" value="science" />
          <label for="science">science</label>
        </div>
        <div>
          <input type="checkbox" id="history" name="tag" value="history" />
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
        <input name = "date" type = "hidden" value = {submitDate}/>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
export default Home;
