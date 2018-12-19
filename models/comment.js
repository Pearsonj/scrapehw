var mongoose = require("mongoose");


var Schema = mongoose.Schema;


var commentSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  comment:{
     type: String,
     required: true
  }
});


var comment = mongoose.model("comment", commentSchema);


module.exports = comment;
