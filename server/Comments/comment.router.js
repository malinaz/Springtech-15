const express = require('express');
const commentRouter = express.Router();
const commentManager = require('./comment.manager');

commentRouter.route('/').post(postComment);
commentRouter.route('/:id').get(getComments);
commentRouter.route('/:id').delete(deleteComment);
commentRouter.route('/:id').put(putComment);

function postComment(request, response) {
    const value = request.body;
    commentManager.createComment(value, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function putComment(request, response) {
    const id = request.params.id;
    const value = request.body.text;

    commentManager.updateComment(id, value, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function getComments(request, response) {
    const id = request.params.id;

    commentManager.getAllComments( id,(data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function deleteComment(request, response) {
    const id = request.params.id;

    commentManager.removeComment(id, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

module.exports = commentRouter;