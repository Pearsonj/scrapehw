var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var commentSchema = new Schema({
 
  user: String,

  comment: String
});


var comment = mongoose.model("comment", commentSchema);


module.exports = comment;
