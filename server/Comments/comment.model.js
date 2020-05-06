const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    user:ObjectId
});

const comment = mongoose.model('comments', commentSchema);

module.exports = comment;