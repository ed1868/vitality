const mongoose = require('mongoose');

// MAKE COMMENT SCHEMA
const commentSchema = mongoose.Schema({
  text : String,
  createdAt : { type: Date, default : Date.now },
  author : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

});

module.exports = mongoose.model('Comment', commentSchema);
