const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB server URL
const dbName = 'db'; // Replace with your database name
const collectionName = 'Questions'; // Replace with your collection name
const userScoreCollectionName = 'UserScores'; // New collection for storing user scores

async function connectToDatabase() {
  const client = new MongoClient(url, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

async function readQuestions() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    const questions = await collection.find({}).toArray();
    console.log('Read', questions.length, 'questions from the collection');
    return questions;
  } catch (err) {
    console.error('Error reading questions:', err);
    throw err;
  }
}

async function saveScore(username, score) {
  try {
    const db = await connectToDatabase();
    const collection = db.collection(userScoreCollectionName);
    await collection.insertOne({ username, score });
    console.log('Score saved for user:', username);
  } catch (err) {
    console.error('Error saving score:', err);
    throw err;
  }
}

module.exports = {
  readQuestions,
  saveScore,
};
