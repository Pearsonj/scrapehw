var express = require("express");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var mongoose = require("mongoose");


var app = express();

var PORT = 3000;

app.use(logger("dev"));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use(express.static("./public"));

var MONGODB_URI = "mongodb://heroku_60q6zzqr:f1m2mpeuri97mc4t98i31lqc41@ds039000.mlab.com:39000/heroku_60q6zzqr" || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.listen(PORT, function () {
  console.log("App running on port 3001!");
});