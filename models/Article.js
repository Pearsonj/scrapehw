var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
  summary:{
    type: String,
    required: true,
    unique: true
  },
  pic: {
    type: String,
    required: true,
    unique: true
  },
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "comment"
  }]
});


var Article = mongoose.model("Article", ArticleSchema);


module.exports = Article;
