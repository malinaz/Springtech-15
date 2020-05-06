const express = require('express');
const CONFIG = require('./config.js');
const mongoose = require('mongoose');
const userRouter = require('./user/user.router');
const postRouter = require('./Posts/post.router');
const commentRouter = require('./Comments/comment.router');
const path = require('path');
const router = express.Router();

const app = express();

function startServer() {
    app.listen(CONFIG.SERVER_PORT, function () {
        console.log(`Server running on port ${CONFIG.SERVER_PORT}`);
    });
}

function startDatabase() {
    mongoose.connect(CONFIG.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Database connection successful!');
    });
}

app.use(express.static('client'));

router.get('/register', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/auth/register/register.html'));
});

router.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname + '/client/auth/login/login.html'));
});

function initRouters() {
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
        next();
    });
    app.use(express.json());
    app.use('/', router);
    app.use('/api/user', userRouter);
    app.use('/api/post',postRouter);
    app.use('/api/comment',commentRouter);
}

function runApp() {
    startServer();
    startDatabase();
    initRouters();
}

runApp();