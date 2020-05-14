const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: String,
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'posts'
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const comment = mongoose.model('comments', commentSchema);

module.exports = comment;