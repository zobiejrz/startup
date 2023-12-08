const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');

const scoreCollection = db.collection('score');
const userCollection = db.collection('user');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

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

module.exports = { getUser,
  getUserByToken,
  createUser,
  addScore,
  getHighScores,
  getNumWins,
  getNumLoss
};
