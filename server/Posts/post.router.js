const express = require('express');
const postsRouter = express.Router();
const postsDatastore = require('./post.datastore');

postsRouter.route('').post(makePost);
postsRouter.route('/id/:id').get(getPosts);
postsRouter.route('/id/:id').delete(deletePost);
postsRouter.route('/id/:id').put(putPost);

function makePost(request, response) {
    const value = request.body;
    postsDatastore.createPost(value, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function putPost(request, response) {
    const id = request.params.id;
    const value = request.body.text;

    postsDatastore.updatePost(id, value, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function getPosts(request, response) {
    const id = request.params.id;

    postsDatastore.getAllPosts( id,(data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function deletePost(request, response) {
    const id = request.params.id;

    postsDatastore.removePost(id, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

module.exports = postsRouter;