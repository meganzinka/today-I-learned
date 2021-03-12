//Imports
const mongoose = require('mongoose')
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
app.use(express.urlencoded({extended: true}))


//Database Set-up 
mongoose.connect('mongodb://localhost:27017/log')
//I guess we don't need these?:{ useNewUrlParser: true, useUnifiedTopology: true}

const entrySchema = new mongoose.Schema({
  title: String,
  content: String,
  tag: Array,
  date: Date
})

const EntriesModel = mongoose.model('entries', entrySchema);

const entriesDB = mongoose.connection 

//Port setup 
app.listen(port, () => {
  console.log("listening on port", port);
});

//Post a new TIL entry 
app.post('/post', (request, response) => {
  console.log(request.body)
  const newEntry = new EntriesModel({
    title: request.body.title, 
    content: request.body.content,
    tag: request.body.tag,
    date: request.body.date
  })

  console.log(newEntry)
  newEntry.save(function(err) {
    if (err) throw err;
    console.log("Entry added")
  })
  response.status(200).send("success")
})

app.get('/showall', async (request, response) => {
  const cursor = await EntriesModel.find({})
  let results = [] 
  await cursor.forEach((entry) => {
    results.push(entry)
  })
console.log(results)
response.json(results)
})



entriesDB.on('error', console.error.bind(console, 'connection error:'))

