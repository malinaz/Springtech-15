const userDataStore = require('./user.dataStore');

const userManager = {
    getUser: (id, success, fail) => {
        userDataStore.findUserById(id, success, fail);
    },
    getPosts: (id, type, success, fail) => {
        if (!type) {
            // load posts from post data store by user id
        }

        if (type === 'liked') {
            userDataStore.findLikedPosts(id, success, fail);
        }

        if (type === 'saved') {
            userDataStore.findSavedPosts(id, success, fail);
        }
    },
};

module.exports = userManager;
