const userDatastore = require("../user/user.dataStore");
const postDatastore = require("./post.datastore");

const postManager = {

    manageLikePost: (userId, postId, success, fail) => {
        postDatastore.getPostById(
            postId,
            (post) => {
                if (post && post._id) {
                    userDatastore.findUserById(userId,
                        (user) => {
                            if (user && user._id) {
                                let found = false;
                                for (let i = 0; i < user.likedPosts.length; i++) {
                                    if (user.likedPosts[i]._id.equals(postId)) {
                                        user.likedPosts.splice(i, 1);
                                        // Decrement number of likes of the post
                                        post.likes--;
                                        found = true;
                                        break;
                                    }
                                }
                                if (!found) {
                                    user.likedPosts.push(post._id);
                                    // Increment number of likes of the post
                                    post.likes++;
                                }

                                userDatastore.updateById(user._id, user, (newUser) => {
                                    postDatastore.updateById(post._id, post, (newPost) => {
                                        success(newPost);
                                    }, () => {
                                        fail({error: "SERVER_ERROR"});
                                    });
                                }, () => {
                                    fail({error: "SERVER_ERROR"});
                                });

                            } else {
                                fail({error: "USER_NOT_FOUND"});
                            }
                        },
                        (error) => {
                            fail({error: "SERVER_ERROR"});
                        })
                } else {
                    fail("POST_NOT_FOUND");
                }
            },
            (error) => {
                fail({error: "SERVER_ERROR"});
            })
    }
}

module.exports = postManager;