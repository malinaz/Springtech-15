const express = require('express');
const postsRouter = express.Router();
const postsDatastore = require('./post.datastore');
const postsManager = require('./post.manager');

postsRouter.route('/like/user/:userId/post/:postId').post(manageLikes);
postsRouter.route('/all').get(getAllPosts);
postsRouter.route('/:id').get(getPostById);


postsRouter.route('').post(makePost);
postsRouter.route('/id/:id').get(getPosts);
postsRouter.route('/id/:id').delete(deletePost);
postsRouter.route('/id/:id').put(putPost);
//postsRouter.route('/id/:id/value/:value').put(putPost); ->caz cand se trimite prin link value

//postsDatastore.route('/id/:id').get(getComments);

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
    const value = request.body.text; //face trimitere la fieldul text din Model
    //daca se face put din link -> se pune request.body.value si atunci nu se mai ia din body

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

function getPostById(request, response) {
    const id = request.params.id;

    postsDatastore.getPostById( id,(data) => {
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

function manageLikes(request, response) {
    const userId = request.params.userId;
    const postId = request.params.postId;

    postsManager.manageLikePost(userId, postId, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    })

}

function getAllPosts(request, response) {

    postsDatastore.getAll( (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}





/*function getComments(request, response) {
    const id = request.params.id;
    postsDatastore.findComments(id, (data) => {
        response.status(200).json(data);
    }, (error) => {
        response.status(500).json(error);
    });
}

//a comment contains text and the user
function postComment(request, response) {
    const value = request.body
}

function deleteComment(request, response) {

}*/


module.exports = postsRouter;