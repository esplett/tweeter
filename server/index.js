"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
var sassMiddleware = require('node-sass-middleware');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));

// adding the sass middleware
var srcPath = __dirname + '/scss';
var destPath = __dirname + '/../public';

app.use(sassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: true,
  outputStyle: 'compressed',
}));
app.use(express.static("public"));

//Connect to Mongo and pass the Mongo db into data helpers
const MongoClient = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

  MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
      throw err;
      console.error(`Failed to connect: ${MONGODB_URI}`);
    }
    const DataHelpers = require("./lib/data-helpers.js")(db);
    const tweetsRoutes = require("./routes/tweets")(DataHelpers);
    app.use("/tweets", tweetsRoutes);
  });

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (  hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we
// can require it and pass the `db` parameter immediately:

// The `tweets-routes` module works similarly: we pass it the `DataHelpers`
//object
// so it can define routes that use it to interact with the data layer.

// Mount the tweets routes at the "/tweets" path prefix:

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
