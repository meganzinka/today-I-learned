//Imports
require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const { MongoClient, ObjectId } = require("mongodb");

//Global variables
const port = process.env.PORT || 5000;
const staticDir = process.env.PRODUCTION
  ? path.resolve("./client/build")
  : path.resolve("./client/public");
//Server set-up
app.use(express.static(staticDir));
app.use(
  express.urlencoded({
    extended: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
);

var ObjectID = require("mongodb").ObjectID;

const mongoAtlastUri = `mongodb+srv://today-megan-learned:today@Cluster0.rgtrz.mongodb.net/log?retryWrites=true&w=majority`;

mongoose.connect(mongoAtlastUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  tag: Array,
  date: Date,
  link: String,
});
const EntriesModel = mongoose.model("entries", entrySchema);
const entriesDB = mongoose.connection;

entriesDB.on("error", (err) => {
  console.error(err);
});

//Port setup
app.listen(port, () => {
  console.log("listening on port", port);
});

//Post a new TIL entry
app.get("/new-entry/:title/:content/:tag/*", (request, response) => {
  //create new object with request params, date
  console.log(request.params)
  let newObj = {
    date: Date.now(),
    title: request.params.title,
    content: request.params.content,
    tag: request.params.tag,
    link: request.params[0],
  };
  //create new entry
  const newEntry = EntriesModel.insertMany(newObj);
  //save entry
  newEntry.save(function (err) {
    if (err) throw err;
  });
});

app.post("/edit/:_id", async (request, response) => {
  let entryId = request.params._id;
  let updateEntry = request.body;
  let newObj = {
    date: Date.now(),
    title: request.body.title,
    content: request.body.content,
    tag: request.body.tag,
    link: request.body.link[0],
  };
  await EntriesModel.replaceOne({ _id: request.params._id.toString() }, newObj, {upsert:true});
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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});
