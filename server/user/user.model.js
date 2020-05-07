const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: String,
    username: {type: String, unique: true},
    password: String,
<<<<<<< HEAD
    email: {type: String, unique: true},
    gender: {type: String, enum: ["male", "female"]},
    likedPosts: [{type: mongoose.Types.ObjectId, ref: "Post"}],
    savedPosts: [{type: mongoose.Types.ObjectId, ref: "Post"}]
=======
    email: { type: String, unique: true },
    gender: { type: String, enum: ['male', 'female'] },
    likedPosts: [{ type: mongoose.Types.ObjectId, ref: 'posts' }],
    savedPosts: [{ type: mongoose.Types.ObjectId, ref: 'posts' }],
>>>>>>> 96b14e14949ea8e86406dca7833b1ae752546158
});

const User = mongoose.model('User', userSchema);

module.exports = User;
