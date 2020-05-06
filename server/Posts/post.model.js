const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    text: String,
    //comments: [],
    likes: Number,
    userId: String
    // userId: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User' -> referinta la tabela user
    // }
});

const posts = mongoose.model('posts',postSchema);

module.exports= posts;