require("dotenv").config();

const DataStore = require("./log.js");
const express = require("express");
const path = require("path");
const app = express();
const staticDir = path.resolve("./client/public");
const port = process.env.PORT || 5000;
const tilDB = new DataStore("mongodb://localhost:27017", "log", "entries");
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require('mongoose')
const entriesDB = mongoose.connection 

app.use(express.static(staticDir));
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true})


entriesDB.on('error', console.error.bind(console, 'connection error:'))

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  tag: Array, 
  date: DateTime
})

const EntriesModel = mongoose.model('entries', entrySchema);




app.post('/post', async (request, response) => {
  const newEntry = new EntriesModel({
    title: req.body.title, 
    content: req.body.content,
    tag: req.body.tag,
    date: Date.now()
  })

  console.log(newEntry)
  newEntry.save(function(err) {
    if (err) throw err;
    console.log("Entry added")
  })
})

module.exports = router 

app.listen(port, () => {
  console.log("listening on port", port);
});
