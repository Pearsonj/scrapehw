module.exports = function(app) {
  var db = require("../models");
  var cheerio = require("cheerio");
  var axios = require("axios");

app.get("/", function (req, res) {
  

  axios.get("https://politics.theonion.com/")
    .then(function(response) {
      console.log("cheerio");
  
    var $ = cheerio.load(response.data);

    var increment = 0;
    $("article.postlist__item").each(function(i, element) {

      var title = $(element).children("header").children("h1.headline").text();
      var link = $(element).children("header").find("a").attr("href");
      var summary = $(element).children("div.item__content").find("div.excerpt").text();


      db.Article.create({title: title, link: link, summary: summary}, function (err, submitted) {
        if (err) {
          // console.log(err)
        } else {
          // console.log(submitted);
        }
        console.log(increment, $("article.postlist__item").length);
        if(increment >= $("article.postlist__item").length - 1){
          renderIndex(req, res);
        } else {
          increment++;
        }
      });
    });
  });
});

function renderIndex (req, res) {

  db.Article.find({}).populate("comment").then(function(found) {
      console.log(found);
      res.render("index", {data: found})
  }).catch(function(err){
    console.log(err);
  }
  )
};

app.post("/api/comment", function(req, res) {
  db.comment.create(req.body).then(function(dbcomment){
    var postData = req.body;
    console.log(postData);
    return db.Article.findOneAndUpdate({_id: postData.postId}, {$push: {user: dbcomment.user, comment: dbcomment.comment }}, {new: true}, function(dbResult){
      renderIndex(req, res);
    });
  })
})

};
