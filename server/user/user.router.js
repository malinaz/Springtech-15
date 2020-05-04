const express = require('express');
const userRouter = express.Router();
const userDatastore = require('./user.dataStore');

userRouter.route('/').post(createNew);

function createNew(req, res) {
    const user = req.body;

    userDatastore.createNew(user, data => {
        res.status(200).json(data);
    }, error => {
        res.status(500).json(error);
    });
}

module.exports = userRouter;