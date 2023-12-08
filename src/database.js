const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const scoreCollection = db.collection('score');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

async function addScore(score) {
  const result = await scoreCollection.insertOne(score);
  return result;
}

function getHighScores() {
  const options = {};
  const cursor = scoreCollection.find(options).limit(10);
  return cursor.toArray();
}

function getNumWins() {
  const cursor = scoreCollection.aggregate([
    { $match: { result: "won" } },
    { $group: { 
        _id: null, 
        total: { 
            $sum: 1 
        } 
    }  }
  ]);
  
return cursor.next();
}

function getNumLoss() {
  const cursor = scoreCollection.aggregate([
    { $match: { result: "failed" } },
    { $group: { 
        _id: null, 
        total: { 
            $sum: 1
        } 
    } }
  ]);
  return cursor.next();
}

module.exports = { addScore, getHighScores, getNumWins, getNumLoss };
