const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB server URL
const dbName = 'db'; // Replace with your database name
const collectionName = 'Questions'; // Replace with your collection name

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

// async function addDataToCollection(data) {
//   try {
//     const db = await connectToDatabase();
//     const collection = db.collection(collectionName);
//     const result = await collection.insertOne(data);

//     console.log(result);

//     if (result) {
//       console.log('Data added successfully');
//       return data;
//     } else {
//       console.error('Error adding data: No data inserted');
//       return null;
//     }
//   } catch (err) {
//     console.error('Error adding data:', err);
//     throw err;
//   }
// }

// // Example usage
// const data = {
//   name: 'John Doe',
//   age: 30,
// };

// addDataToCollection(data)
//   .then((addedData) => {
//     if (addedData) {
//       console.log('Added data:', addedData);
//     } else {
//       console.log('No data was added.');
//     }
//   })
//   .catch((err) => {
//     console.error('Error adding data:', err);
//   });


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

// Example usage
readQuestions()
  .then((questions) => {
    console.log('Questions:', questions);
  })
  .catch((err) => {
    console.error('Error:', err);
  });
