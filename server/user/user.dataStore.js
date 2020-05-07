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
        User.findOne({_id: id})
            .then((data) => {
                success(data)
            })
            .catch((error) => {
                fail(error)
            });
    },
<<<<<<< HEAD

    updateById: (id, user, success, fail) => {
        User.findByIdAndUpdate(id, user, {new: true})
            .then((data) => {
                success(data);
            })
            .catch((error) => {
                fail(error)
            });
    }
=======
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
>>>>>>> 96b14e14949ea8e86406dca7833b1ae752546158
};

module.exports = userDatastore;
