//Imports
const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

//Global variables
const port = process.env.PORT || 5000;
const staticDir = path.resolve("./client/public");

//Server set-up
const app = express();
app.use(express.static(staticDir));
app.use(
  express.urlencoded({
    extended: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
);

//Database Set-up
mongoose.connect("mongodb://localhost:27017/log");
//I guess we don't need these?:{ useNewUrlParser: true, useUnifiedTopology: true}

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  tag: Array,
  date: Date,
});
const EntriesModel = mongoose.model("entries", entrySchema);
const entriesDB = mongoose.connection;

//Port setup
app.listen(port, () => {
  console.log("listening on port", port);
});

//Post a new TIL entry
app.post("/post", (request, response) => {
  //create new object with request params, date
  let newObj = {
    date: Date.now(),
    title: request.body.title,
    content: request.body.content,
    tag: request.body.tag,
  };
  //create new entry
  const newEntry = new EntriesModel(newObj);
  //save entry
  newEntry.save(function (err) {
    if (err) throw err;
  });

  //send 200 status and redirect
  response.status(200).redirect(path.resolve("/"));
});

//I obviously did not figure out how to do this - I couldn't get the info to communicate to the server
app.post("/edit/:_id", async (request, response) => {
  console.log(request.body);
  let entryId = { _id: request.params._id };
  let updateEntry = { [request.body.category]: request.body.update };
  await EntriesModel.updateOne(entryId, updateEntry);
  response.redirect(path.resolve("/facts"));
});

//show all results
app.get("/showall", async (request, response) => {
  //find all
  const cursor = await EntriesModel.find({});
  let results = [];
  await cursor.forEach((entry) => {
    results.push(entry);
  });
  response.json(results);
});

//delete an entry
app.get("/delete/:id", async (request, response) => {
  await EntriesModel.deleteOne({ _id: request.params.id });
  response.status(200).redirect(path.resolve("/"));
});

//find a certain entry
app.get("/show/:id", async (request, response) => {
  const cursor = await EntriesModel.findOne({ _id: request.params.id });
  response.json(cursor);
});

entriesDB.on("error", console.error.bind(console, "connection error:"));
