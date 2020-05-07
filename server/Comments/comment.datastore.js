const Comment = require('./comment.model');

const commentDatastore = {
    createComment: (value, success, fail) => {
        Comment.create(value)
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    updateComment: (id, value, success, fail) => {
        Comment.findOneAndUpdate(
            {"_id": id},
            {$set: {"text": value}},
            {new: true})
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    getAllComments: (id, success, fail) => {
        Comment.find({"postId": id})
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    },

    removeComment: (id, success, fail) => {
        Comment.deleteOne({"_id": id})
            .then((data) => {
                success(data);
            }).catch((error) => {
            fail(error);
        });
    }
}


module.exports = commentDatastore;