const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: String,
    comments: [],
    likes: { type: Number, default: 0 },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const posts = mongoose.model('posts', postSchema);

module.exports = posts;
