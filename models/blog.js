const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImgUrl: {
        type: String,
        required: false,
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    imgLink: {
        type: String,
    },
}, { timestamp: true });


const blog = mongoose.model('blog', blogSchema);

module.exports = blog;