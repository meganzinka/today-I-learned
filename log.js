const { MongoClient, ObjectId } = require("mongodb");

class DataStore {
  constructor(dbUrl, database, collection) {
    this.url = dbUrl;
    this.dbName = database;
    this.collectionName = collection;
    this.isConnected = false;
  }

  async OpenConnect() {
    if (!this.isConnected) {
      const client = new MongoClient(this.url, { useUnifiedTopology: true });
      await client.connect();
      const dataBase = client.db(this.dbName);
      const collection = dataBase.collection(this.collectionName);
      this.isConnected = client;
      return collection;
    } else {
      const dataBase = this.isConnected.db(this.dbName);
      const collection = dataBase.collection(this.collectionName);
      return collection;
    }
  }
  //for Entries page
  async showAll() {
    const collection = await this.OpenConnect();

    //find all entries
    let cursor = await collection.find({});
    let resultsArr = [];
    //put each document into the array & return it
    await cursor.forEach((document) => {
      resultsArr.push(document);
    });
    return resultArr;
  }
  //for Entries page
  async searchByKey(searchType, value) {
    const collection = await this.OpenConnect();
    //find entry of specified type
    let cursor = await collection.find({ [searchType]: value });
    let resultsArr = await cursor.forEach((document) => {
      resultsArr.push(document);
    });
    return resultsArr;
  }
  //for Home page
  async addEntry(data) {
    const collection = await this.OpenConnect();
    //insert the new entry
    await collection.insertOne(data);
    return data;
  }
  //Edit & Delete Page
  async deleteEntry(targetId) {
    const collection = await this.OpenConnect();
    //delete specified entry
    await collection.deleteOne({ _id: ObjectId(targetId) });
  }

  //Edit & Delete Page
  async updateEntry(targetId, update) {
    const collection = await this.OpenConnect();
    //set new information for specified object
    await collection.updateOne({ _id: ObjectId(targetId) }, { $set: update });
  }

  async closeConnect() {
    if (this.isConnected) {
      await this.isConnected.close();
    }
  }
}

module.exports = DataStore