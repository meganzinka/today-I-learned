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

//Database Set-up
const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://today-megan-learned:today@cluster0.rgtrz.mongodb.net/log?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
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
});

app.post("/edit/:_id", async (request, response) => {
  console.log("request.body:", request.body);
  let entryId = { _id: request.params._id };
  let updateEntry = request.body;
  console.log("entryId", entryId);
  console.log("updateEntry:", updateEntry);
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

app.get("*", (req, res) => {
  res.sendFile(path.resolve(staticDir + "/index.html"));
});
