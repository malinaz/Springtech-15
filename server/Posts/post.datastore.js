const Post = require('./post.model');

const postsDatastore = {
    create: (value, success, fail) => {
        Post.create(value)
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    update: (id, value, success, fail) => {
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

    getAll: (success, fail) => {
        Post.find().populate('userId', 'username')
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    getAllPostsAndPopulateUsername: (id, success, fail) => {
        Post.find({"userId": id})
            .populate('userId', 'username')
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    remove: (id, success, fail) => {
        Post.deleteOne({"_id": id})
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    getById: (id, success, fail) => {
        Post.findOne({_id: id})
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    updateById: (id, post, success, fail) => {
        Post.findByIdAndUpdate(id, post, {new: true})
            .then((data) => {
                success(data);
            })
            .catch((error) => {
                fail(error)
            });
    }

}

module.exports = postsDatastore;