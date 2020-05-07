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

    updateById: (id, user, success, fail) => {
        User.findByIdAndUpdate(id, user, {new: true})
            .then((data) => {
                success(data);
            })
            .catch((error) => {
                fail(error)
            });
    }
};

module.exports = userDatastore;
