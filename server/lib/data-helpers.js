"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the
// database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().sort().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets);
      });
    },
   saveTweet: function(newTweet, callback) {
    db.collection('tweets').insertOne(newTweet, (err, r) =>{
      if (err) {
        return callback(err);
      };
      callback(null, newTweet);
    });
    }
  }
}

