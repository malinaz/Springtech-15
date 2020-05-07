const userDataStore = require('./user.dataStore');
const postDataStore = require('../Posts/post.datastore');

const userManager = {
    getUser: (id, success, fail) => {
        userDataStore.findUserById(id, success, fail);
    },
    getPosts: (id, type, success, fail) => {
        if (!type) {
            postDataStore.getAllPosts(id, success, fail);
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
