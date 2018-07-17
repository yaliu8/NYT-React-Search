// Node Dependencies
var express = require('express');
var router = express.Router();

// Import the Article model
var Article = require('../models/Article.js');

// Main GET - displays the ReactJS application.
router.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

// API GET - queries MongoDB for all saved articles.
router.get("/api/saved", function(req, res) {
  
  // Queries Mongo for the Articles
   Article.find({}, function(err, docs){
      // log any errors
      if (err){
        console.log(err);
      } 
      // or send the doc to the browser as a json object
      else {
        res.json(docs);
      }
   });

});


// API POST - use to save an article to the database.
router.post("/api/saved", function(req, res) {
  
// Creates new entry
  var entry = new Article (req.body);

  // Saves entry to MongoDB
  entry.save(function(err, doc) {
    // log any errors
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } 
    // or log the doc that was saved to the DB
    else {
      console.log(doc);
      res.sendStatus(200);
    }
  });

});


// API DELETE - delete a saved article in the database
router.post("/api/delete/:articleMongoId", function(req, res) {
  console.log(req.params.articleMongoId)
  Article.findByIdAndRemove(req.params.articleMongoId, function (err, todo) {
    if (err) {
      // Failure alert
      console.log(err);      
      res.sendStatus(400);
    } 
    else {
      // Success alert
      res.sendStatus(200);
    }
  });

});


// Used to redirect users to the "/" route for any unknown cases
router.get("*", function(req, res) {
  res.redirect("/");
});


// Export Router to Server.js
module.exports = router;