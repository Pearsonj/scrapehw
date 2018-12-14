module.exports = function(app) {
  var db = require("../models");
  var cheerio = require("cheerio");
  var axios = require("axios");

  app.post("/", function (req, res) {
  
  axios.get("https://politics.theonion.com/")
  .then(function(response) {

 
  var $ = cheerio.load(response.data);


  $("a.js_curation-click").each(function(i, element) {

    var title = $(element).text();
    var link = $(element).attr("href");

  db.Article.create({title: title, link: link}, function (err, submitted) {
    if (err) {
      console.log(err)
    } else {
      console.log(submitted);
    }
  });

  
 
  });
});

axios.get("https://politics.theonion.com/")
  .then(function(response) {

 
  var $ = cheerio.load(response.data);


  $("h1.headline").each(function(i, element) {

    var title = $(element).text();
    var link = $(element).children().attr("href");

  db.Article.create({title: title, link: link}, function (err, submitted) {
    if (err) {
      console.log(err)
    } else {
      console.log(submitted);
    }
  });

  
 
  });
});
});

app.get("/read", function (req, res) {
  db.Article.find({},function(err, found) {
    if(err){
      console.log(err)
    } else{
      res.json(found)
    }
  });
});

};
