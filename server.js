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
mongoose.connect("mongodb://localhost:27017/log", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
//I guess we don't need these?:{ useNewUrlParser: true, useUnifiedTopology: true}

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  tag: Array,
  date: Date,
  link: String,
});
const EntriesModel = mongoose.model("entries", entrySchema);
const entriesDB = mongoose.connection;

//Port setup
app.listen(port, () => {
  console.log("listening on port", port);
});

//Post a new TIL entry
app.get("/new-entry/:title/:content/:tag/*", (request, response) => {
  //create new object with request params, date
  let newObj = {
    date: Date.now(),
    title: request.params.title,
    content: request.params.content,
    tag: request.params.tag,
    link: request.params[0],
  };
  //create new entry
  const newEntry = new EntriesModel(newObj);
  //save entry
  newEntry.save(function (err) {
    if (err) throw err;
  });

  //send 200 status and redirect
  // response.status(200).redirect(path.resolve("/popup"));
});

//I obviously did not figure out how to do this - I couldn't get the info to communicate to the server
app.post("/edit/:_id", async (request, response) => {
  console.log("request.body:", request.body);
  let entryId = { _id: request.params._id };
  let updateEntry = request.body;
  console.log("entryId", entryId)
  console.log("updateEntry:", updateEntry)
  await EntriesModel.findByIdAndUpdate(entryId, updateEntry);
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
  response.redirect(path.resolve("/facts"));
});

//find a certain entry
app.get("/show/:id", async (request, response) => {
  const cursor = await EntriesModel.findOne({ _id: request.params.id });
  response.json(cursor);
});

entriesDB.on("error", console.error.bind(console, "connection error:"));
