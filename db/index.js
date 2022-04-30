const { MongoClient } = require("mongodb");
const connectionString = "";

const client = new MongoClient(connectionString);

exports.client = client;
