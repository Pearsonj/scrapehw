module.exports = function(app) {
  var db = require("../models");
  var cheerio = require("cheerio");
  var axios = require("axios");

  function renderIndex (req, res) {
    db.Article.find({}).populate("comment").then(function(found) {
      console.log(found);
        res.render("index", {data: found})
    }).catch(function(err){
      console.log(err);
    }
    )
  };

app.get("/", function (req, res) {

  axios.get("https://www.nytimes.com/section/politics")
    .then(function(response) {
      console.log("cheerio");
  
    var $ = cheerio.load(response.data);

    var increment = 0;
    $("li.css-ye6x8s").each(function(i, element) {

      var title = $(element).children().find("div.css-4jyr1y").children().find("h2").text();
      var link = $(element).children().find("div.css-4jyr1y").children().attr("href");
      var summary = $(element).children().find("div.css-4jyr1y").children().find("p").text();
      var pic = $(element).children().find("div.css-4jyr1y").children().children().find("figure").find("div.css-79elbk").find("img").attr("src")


      db.Article.create({title: title, link: link, summary: summary, pic: pic}, function (err, submitted) {
        if (err) {
          // console.log(err)
        } else {
          // console.log(submitted);
        }
        console.log(increment, $("li.css-ye6x8s").length);
        if(increment >= $("li.css-ye6x8s").length - 1){
          renderIndex(req, res);
        } else {
          increment++;
        }
      });
    });
  });
});

app.post("/api/comment", function(req, res) {
  db.comment.create(req.body).then(function(dbcomment){
    var postData = req.body;
    console.log(postData);
    return db.Article.findOneAndUpdate({_id: postData.postId}, {$push: {comment: dbcomment._id}}, {new: true});
  }).then(function(dbArticle) {
    res.redirect("/");
  }).catch(function(err) {
    res.json(err);
  });
});

app.post("/api/delete", function(req, res){
  db.comment.findOneAndRemove({_id: req.body.commentId}).then(function(err, deleted){
      if(err) {
        console.log(err);
      }else{
        renderIndex(req, res);
      }
  })
})

};
