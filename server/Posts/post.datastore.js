const Post = require('./post.model');

const postsDatastore = {
    createPost: (value, success, fail) => {
        Post.create(value)
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    updatePost: (id, value, success, fail) => {
        Post.findOneAndUpdate(
            {"_id": id},
            {$set: {"text": value}},
            {new: true})
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    getAllPosts: (id, success, fail) => {
        Post.find({"userId": id})
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    getAllPostsAndPopulateFullName: (id, success, fail) => {
        Post.find({"userId": id})
            .populate('userId', 'fullName')
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    removePost: (id, success, fail) => {
        Post.deleteOne({"_id": id})
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    }
}

module.exports = postsDatastore;