const User = require("./user.model");

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
    User.findOne({ _id: id })
      .then((data) => {
        success(data);
      })
      .catch((error) => {
        fail(error);
      });
  },

  updateById: (id, user, success, fail) => {
    User.findByIdAndUpdate(id, user, { new: true })
      .then((data) => {
        success(data);
      })
      .catch((error) => {
        fail(error);
      });
  },

  findLikedPosts: (id, success, fail) => {
    User.findById(id)
      .populate({
        path: "likedPosts",
        populate: { path: "userId", select: "username" },
      })
      .then((data) => {
        success(data.likedPosts);
      })
      .catch((error) => {
        fail(error);
      });
  },
  findSavedPosts: (id, success, fail) => {
    User.findById(id)
      .populate({
        path: "savedPosts",
        populate: { path: "userId", select: "username" },
      })
      .then((data) => {
        success(data.savedPosts);
      })
      .catch((error) => {
        fail(error);
      });
  },
  getAllMyFreinds: (id, success, fail) => {
    User.findById(id)
      .populate({
        path: "myFriends",
        populate: { path: "userId", select: "fullName" },
      })
      .then((data) => {
        success(data.myFriends);
      })
      .catch((error) => {
        fail(error);
      });
  },
  getAllFreindsRequest: (id, success, fail) => {
    User.findById(id)
      .populate({
        path: "friendsRequest",
        populate: { path: "userId", select: "fullName" },
      })
      .then((data) => {
        success(data.friendsRequest);
      })
      .catch((error) => {
        fail(error);
      });
  },
  updateFriends: (userId, myFriends, success, fail) => {
    User.findByIdAndUpdate(userId, { myFriends: myFriends }, { new: true })
      .then((data) => {
        success(data);
      })
      .catch((error) => {
        fail(error);
      });
  },
  updateFriendsRequest: (userId, myRequest, success, fail) => {
    User.findByIdAndUpdate(userId, myRequest, { new: true })
      .then((data) => {
        success(data);
      })
      .catch((error) => {
        fail(error);
      });
  },
};

module.exports = userDatastore;
