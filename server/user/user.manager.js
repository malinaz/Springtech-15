const userDataStore = require("./user.dataStore");
const postDataStore = require("../Posts/post.datastore");

const userManager = {
    createNew: (user, success, fail) => {
        userDataStore.createNew(user, success, fail);
    },
  getUser: (id, success, fail) => {
    userDataStore.findUserById(id, success, fail);
  },
  updateById: (id, newUser, success, fail) => {
      userDataStore.updateById(id, newUser, success, fail);
  },
  findByUserNameAndPassword: (userName, password, success, fail) => {
    userDataStore.findByUserNameAndPassword(userName, password, success, fail);
  },
  getAllMyFreinds: (id, success, fail) => {
    userDataStore.getAllMyFreinds(id, success, fail);
  },
  getAllFreindsRequest: (id, success, fail) => {
    userDataStore.getAllFreindsRequest(id, success, fail);
  },
  getPosts: (id, type, success, fail) => {
    if (!type) {
      postDataStore.getAllPostsAndPopulateUsername(id, success, fail);
    }

    if (type === "liked") {
      userDataStore.findLikedPosts(id, success, fail);
    }

    if (type === "saved") {
      userDataStore.findSavedPosts(id, success, fail);
    }
  },
  sendRequest: (myId, friendId, success, fail) => {
    userDataStore.findUserById(
      myId,
      (me) => {
        if (me && me._id) {
          userDataStore.findUserById(
            friendId,
            (friend) => {
              if (friend && friend._id) {
                let found = false;
                for (let i = 0; i < friend.friendsRequest.length; i++) {
                  if (String(friend.friendsRequest[i]) == String(me._id)) {
                    found = true;
                  }
                }
                if (!found) {
                  friend.friendsRequest.push(me._id);

                  userDataStore.updateById(
                    friend._id,
                    friend,
                    (updatedFriend) => {
                      success(updatedFriend);
                    },
                    (error) => {
                      fail("SOMETHING WENT WRONG!");
                    }
                  );
                } else {
                  success(friend);
                }
              }
            },
            () => {
              fail("SOMETHING WENT WRONG!");
            }
          );
        }
      },
      () => {
        fail("SOMETHING WENT WRONG!");
      }
    );
  },
  acceptRequest:(myId,friendId,success,fail)=>{
    userDataStore.findUserById(
        myId,
        (me)=>{
            if(me && me._id)
            {
                userDataStore.findUserById(
                    friendId,
                    (friend)=>{
                        if(friend &&friend._id)
                        {
                            friend.myFriends.push(me._id);
                            userDataStore.updateById(
                                friend._id,
                                friend,
                                (updatedFriend)=>{
                                    success(updatedFriend)
                                },
                                (error)=>{
                                    console.log(error);
                                }
                            ),(error)=>{
                                fail(error);
                            }

                            me.myFriends.push(friend._id);
                            userDataStore.updateById(
                                me._id,
                                me,
                                (updatedMe)=>{
                                    success(updatedMe)
                                },
                                (error)=>{
                                    fail(error)
                                }
                            )
                        }
                    }),(error)=>{
                        fail(error);
                    }
            }
        }
    ),(error)=>{
        fail(error);
    }
  },
  cancelRequest(myId,friendId,success,fail)
  {
      userDataStore.findUserById(
          myId,
          (me)=>{
              if(me &&me._id)
              {
                  userDataStore.findUserById(
                      friendId,
                      (friend)=>{
                          if(friend && friend._id)
                          {
                              let pos=-1;
                             for(let i=0;i<me.friendsRequest.length;i++)
                             {
                                 if(String(me.friendsRequest[i])==String(friend._id))
                                 {
                                     pos=i;
                                     break;
                                 }
                             }

                             if(pos!=-1)
                             {

                                me.friendsRequest.splice(pos,1)
                                userDataStore.updateById(
                                  me._id,
                                  me,
                                  (updatedMe)=>{

                                      console.log(pos);


                                      success(updatedMe)
                                  },
                                  (error)=>{
                                      fail("error")
                                  }
                              )}
                              else{
                                  success(me)
                              }
                          }
                      }
                  ),(error)=>{
                      fail("error")
                  }
              }
          },(error)=>{
              fail("error")
          }
      )
  },
  deleteFriend:(myId,friendId,success,fail)=>{
      userDataStore.findUserById(
          myId,
          (me)=>{
              if(me && me._id)
              {
                  userDataStore.findUserById(
                      friendId,
                      (friend)=>{
                          if(friend && friend._id)
                          {
                              let pos=-1;
                              for(let i=0;i<me.myFriends.length;i++)
                              {
                                  if(String(me.myFriends[i])==String(friend._id)){
                                      pos=i
                                  }
                              }
                              if(pos!=-1)
                              {
                                  me.myFriends.splice(pos,1)
                                  userDataStore.updateById(
                                      me._id,
                                      me,
                                      (updatedMe)=>{
                                          success(updatedMe)
                                      },
                                      (error)=>{
                                          fail("error")
                                      }
                                  )
                              }

                              pos=-1;

                              for(let i=0;i<friend.myFriends.length;i++)
                              {
                                  if(String(friend.myFriends[i])==String(me._id)){
                                      pos=i
                                  }
                              }
                              if(pos!=-1)
                              {
                                  friend.myFriends.splice(pos,1)
                                  userDataStore.updateById(
                                      friend._id,
                                      friend,
                                      (updatedFriend)=>{
                                          success(updatedFriend)
                                      },
                                      (error)=>{
                                          fail("error")
                                      }
                                  )
                              }
                          }
                      },
                      (error)=>{
                          console.log(error)
                      }
                  )
              }
          },(error)=>{
              fail(error)
          }
      )
  },

    checkIfRequestSent: (myId,friendId,success,fail)=>{
      userDataStore.findUserById(myId, (me) => {
          if (me && me._id) {
              userDataStore.findUserById(friendId, (friend) => {
                  if (friend && friend._id) {
                      let found = -1;
                      for (let i = 0; i < friend.friendsRequest.length; i++) {

                          if (friend.friendsRequest[i].equals(myId)) {
                              found = i;
                              break;
                          }
                      }

                      if (found === -1) {
                          success(false);
                      } else {
                          success(true);
                      }

                  }
              }, () => {
                  fail("something went wrong!");
              });
          }
      }, () => {
          fail("something went wrong!");
      });
    },

    checkIfFrieds:  (myId,friendId,success,fail)=> {
        userDataStore.findUserById(myId, (me) => {
            if (me && me._id) {
                userDataStore.findUserById(friendId, (friend) => {
                    if (friend && friend._id) {
                        let ok = -1;
                        for (let i = 0; i < me.myFriends.length; i++) {
                            if (me.myFriends[i].equals(friend._id)) {
                                ok = 1;
                                success(true);
                                break;
                            }
                        }
                        if(ok === -1) {
                            success(false);
                        }

                    }
                }, (error) => {
                    fail(error);
                });
            }

        }, (error) => {
            fail(error);
        });
    }

};

module.exports = userManager;
