const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'posts'
    }
});

const comment = mongoose.model('comments', commentSchema);

module.exports = comment;