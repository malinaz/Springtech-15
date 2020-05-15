const commentDatastore = require("./comment.datastore");

const commentManager = {
    createComment: (value, success, fail) => {
        commentDatastore.createComment(value, success, fail);
    },
    updateComment: (id, value, success, fail) => {
        commentDatastore.updateComment(id, value, success, fail);
    },
    getAllComments: (id, success, fail) => {
        commentDatastore.getAllComments(id, success, fail);
    },
    removeComment: (id, success, fail) => {
        commentDatastore.removeComment(id, success, fail);
    }
}

module.exports = commentManager;