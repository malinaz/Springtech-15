const User = require('./user.model');

const userDatastore = {
    createNew: (user, success, fail) => {
        User.create(user)
        .then(data => {
            success(data);
        })
        .catch(error => {
            fail(error);
        })
    }
}

module.exports = userDatastore;