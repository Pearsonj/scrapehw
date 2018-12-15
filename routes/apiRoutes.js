module.exports = function(app) {
  var db = require("../models");
  var cheerio = require("cheerio");
  var axios = require("axios");

app.post("/", function (req, res) {
  

axios.get("https://politics.theonion.com/")
  .then(function(response) {

 
  var $ = cheerio.load(response.data);


  $("article.postlist__item").each(function(i, element) {

    var title = $(element).children("header").children("h1.headline").text();
    var link = $(element).children("header").find("a").attr("href");
    var summary = $(element).children("div.item__content").find("div.excerpt").text()

  db.Article.create({title: title, link: link, summary: summary}, function (err, submitted) {
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
      res.render("index", {data: found})
    }
  });
});

};
