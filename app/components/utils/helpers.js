// Node Dependencies
var axios = require('axios');

// NY Times API Request Function
var articleQuery = function(topic, beginYear, endYear){

  var authKey = "fb3a6123c06349c7968c85ec16cf27c2";

  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" +
                  topic + "&begin_date=" + beginYear + "0101" + "&end_date=" + endYear + "1231";


  // JavaScript *Promise*
  return new Promise(function (fulfill, reject){
    // NY Times API GET request
    axios.get(queryURL).then(function(response) {

      var result = [];

      // Return the first 5 articles
      if (response.data.response.docs[0]) {

        for(var i=0; i<response.data.response.docs.length; i++){          
          if(i==5){
            break;
          }
          else {
            // Otherwise, push to results array
            result.push(response.data.response.docs[i]);
          }
        }

        // Return the array of articles via *Promise*
        fulfill(result);
        
      }
      else{
        // If we don't get any results, return an empty string via *Promise*
        reject("");
      }
      
    });
  });

}





// API Post Request Function
var apiSave = function(articleObj){

  var apiURL = window.location.origin + '/api/saved';

  // Create JavaScript *Promise*
  return new Promise(function (fulfill, reject){

    // Re-format the article object 
    var params = new URLSearchParams();
    params.append("title", articleObj.title);
    params.append("date", articleObj.date);
    params.append("url", articleObj.url);
    axios.post(apiURL, params).then(function(response){

      // Error handling
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
      
    })

  });
  
}





// API Post Request Function
var apiGet = function(){

  // Get API Post URL
  var apiURL = window.location.origin + '/api/saved';

  // Create JavaScript *Promise*
  return new Promise(function (fulfill, reject){

    // Re-format article Object to match the Mongo Model 
    axios.get(apiURL).then(function(response) {

      // Error handling
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });
    
  });
  
}





// API Post Request Function
var apiDelete = function(deleteArticleId){

  var apiURL = window.location.origin + '/api/delete/' + deleteArticleId;

  return new Promise(function (fulfill, reject){

    axios.post(apiURL).then(function(response) {

      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });

  });

}





// Export all helper functions
module.exports = {
 articleQuery,
 apiSave,
 apiGet,
 apiDelete
}
