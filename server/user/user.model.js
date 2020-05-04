const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    username: { type: String, unique: true },
    password: String,
    email: { type: String, unique: true },
    gender: { type: String, enum: ["male", "female"] },
    likedPosts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
    savedPosts: [{ type: mongoose.Types.ObjectId, ref: "Post" }]
});

const User = mongoose.model('User', userSchema);

module.exports = User;