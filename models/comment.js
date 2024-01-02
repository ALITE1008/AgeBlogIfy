const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
   content:{
    type:String,
    required:true,
   },
   blogId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"blog",
   },
   createdby:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
   },
}, { timestamp: true })

const comment = mongoose.model('comment', commentSchema);

module.exports = comment;