const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const app = express();
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./src/watchItTogetherDB.db', sqlite.OPEN_READWRITE, err => 
{
  if (err) return console.error(err);
  console.log("connection succesful");
});

// app.use(bodyParser.json());

// app.post('/watchItTogetherDB', (req, res) => 
// {
//   try
//   {
//     console.log("req.body");
//     return res.json({status:200, success:true});
//   }
//   catch (error)
//   {
//     return res.json({status:400, success:false});
//   }
// })

// db.run(
//   `CREATE TABLE Users
//   (
//     ID INTEGER PRIMARY KEY,
//     Login TEXT NOT NULL UNIQUE CHECK (length (Login) <= 50),
//     Password TEXT NOT NULL CHECK (length (Password) <= 50)
//   )`
// );

// db.run(
//   `CREATE TABLE TVShows
//   (
//     ID INTEGER PRIMARY KEY,
//     UserID INTEGER NOT NULL,
//     ShowID INTEGER NOT NULL,
//     ShowStatus TEXT NOT NULL CHECK (ShowStatus IN ('WATCHED', 'ADDED')),
//     FOREIGN KEY (UserID) REFERENCES Users (ID)
//   )`
// );

// db.run(
//   `CREATE TABLE Friends
//   (
//     ID INTEGER PRIMARY KEY,
//     UserID INTEGER NOT NULL,
//     FriendID INTEGER NOT NULL,
//     Status TEXT NOT NULL CHECK (Status IN ('INVITED', 'ADDED', 'REJECTED')),
//     FOREIGN KEY (UserID) REFERENCES Users (ID),
//     FOREIGN KEY (FriendID) REFERENCES Users (ID)
//   )`
// );

db.close((err) => {if (err) return console.error(err);});