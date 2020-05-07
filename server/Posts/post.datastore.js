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

    getAll: (success, fail) => {
        Post.find()
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
    },

    getPostById: (id, success, fail) => {
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



    /*findComments: (id, success, fail) => {
        Post.findById(id)
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    }*/

}

module.exports = postsDatastore;