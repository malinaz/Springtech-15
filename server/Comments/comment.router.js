const express = require('express');
const commentRouter = express.Router();
const commentDatastore = require('./comment.datastore');

commentRouter.route('/').post(postComment);
commentRouter.route('/id/:id').get(getComments);
commentRouter.route('/id/:id').delete(deleteComment);
commentRouter.route('/id/:id').put(putComment);

function postComment(request, response) {
    const value = request.body;
    commentDatastore.createComment(value, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function putComment(request, response) {
    const id = request.params.id;
    const value = request.body.text;

    commentDatastore.updateComment(id, value, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function getComments(request, response) {
    const id = request.params.id;

    commentDatastore.getAllComments( id,(data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function deleteComment(request, response) {
    const id = request.params.id;

    commentDatastore.removeComment(id, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

module.exports = commentRouter;