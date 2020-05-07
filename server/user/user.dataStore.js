const User = require('./user.model');

const userDatastore = {
    createNew: (user, success, fail) => {
        User.create(user)
            .then((data) => {
                success(data);
            })
            .catch((error) => {
                fail(error);
            });
    },

    findByUserNameAndPassword: (username, password, success, fail) => {
        User.findOne({
            username: username,
            password: password,
        })
            .then((data) => {
                success(data);
            })
            .catch((error) => {
                fail(error);
            });
    },
    findUserById: (id, success, fail) => {
        User.findById(id)
            .then((data) => {
                success(data);
            })
            .catch((error) => {
                fail(error);
            });
    },
    findLikedPosts: (id, success, fail) => {
        User.findById(id)
            .populate('likedPosts')
            .then((data) => {
                success(data.likedPosts);
            })
            .catch((error) => {
                fail(error);
            });
    },
    findSavedPosts: (id, success, fail) => {
        User.findById(id)
            .populate('savedPosts')
            .then((data) => {
                success(data.savedPosts);
            })
            .catch((error) => {
                fail(error);
            });
    },
};

module.exports = userDatastore;
