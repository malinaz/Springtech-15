const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: String,
    comments: [],
    likes: Number,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const posts = mongoose.model('posts',postSchema);

module.exports= posts;