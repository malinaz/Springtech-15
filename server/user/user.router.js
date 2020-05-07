const express = require('express');
const userRouter = express.Router();
const userDatastore = require('./user.dataStore');
const userManager = require('./user.manager');

userRouter.route('/').post(createNew);
userRouter.route('/:id').get(getUserById);
userRouter.route('/:id/posts').get(getPostsForUser);
userRouter.route('/:username/:password').get(getByUserNameAndPassword);

function createNew(req, res) {
    const user = req.body;

    userDatastore.createNew(
        user,
        (data) => {
            res.status(200).json(data);
        },
        (error) => {
            res.status(500).json(error);
        }
    );
}

function getByUserNameAndPassword(request, response) {
    const userName = request.params.username;
    const password = request.params.password;

    userDatastore.findByUserNameAndPassword(
        userName,
        password,
        (data) => {
            response.status(200).json(data);
        },
        (error) => {
            response.status(500).json(error);
        }
    );
}

function getUserById(req, res) {
    const id = req.params.id;

    userManager.getUser(
        id,
        (data) => {
            res.status(200).json(data);
        },
        (error) => res.status(500).json(error)
    );
}
function getPostsForUser(req, res) {
    const id = req.params.id;
    const type = req.query.type;

    userManager.getPosts(
        id,
        type,
        (data) => {
            res.status(200).json(data);
        },
        (error) => res.status(500).json(error)
    );
}

module.exports = userRouter;

