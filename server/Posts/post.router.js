const express = require('express');
const postsRouter = express.Router();
const postsDatastore = require('./post.datastore');
const postsManager = require('./post.manager');


postsRouter.route('/all').get(getAll);
postsRouter.route('/:id').get(getById);
postsRouter.route('/').post(createPost);
postsRouter.route('/:id').delete(deletePost);
postsRouter.route('/:id').put(updatePost);

postsRouter.route('/like/user/:userId/post/:postId').post(manageLikes);

function getAll(request, response) {

    postsDatastore.getAll( (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function getById(request, response) {
    const id = request.params.id;

    postsDatastore.getById( id,(data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function createPost(request, response) {
    const value = request.body;
    postsDatastore.create(value, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function updatePost(request, response) {
    const id = request.params.id;
    const newPost = request.body;

    postsDatastore.updateById(id, newPost, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function deletePost(request, response) {
    const id = request.params.id;

    postsDatastore.remove(id, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

function manageLikes(request, response) {
    const userId = request.params.userId;
    const postId = request.params.postId;

    postsManager.manageLikePost(userId, postId, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    })

}



module.exports = postsRouter;