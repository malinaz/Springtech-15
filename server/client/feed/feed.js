window.onload = init;

var activeUser;
var posts = [];

function init() {
  sendGetUserByIdRequest();
  renderNavbar();
  sendGetAllPostsRequest();
  setPageEvents();
}

function sendGetUserByIdRequest() {
  const userId = localStorage.getItem('userId');
  
  $.ajax({
    url: 'http://localhost:3000/api/user/' + userId,
    type: 'GET',
    success: function (result) {
        activeUser = result;
    },
    error: function (error) {
        console.log(error);
    }
  });
}

function sendGetAllPostsRequest() {
  $.ajax({
    url: 'http://localhost:3000/api/post/all',
    type: 'GET',
    success: function (result) {
        posts = result;
        renderPostsList();
    },
    error: function (error) {
        console.log(error);
    }
  });
}

function setPageEvents() {
  $('.btn-add-new').on('click', function () {
    const postText = $('.post-input').val();

    if (postText.trim() != '') {
      sendAddPostRequest(postText);
    }

    $('.post-input').val('');
  })
}

function sendAddPostRequest(postText) {
  const post = {
    text: postText,
    userId: activeUser._id
  }

  $.ajax({
    url: 'http://localhost:3000/api/post/',
    type: 'POST',
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        console.log(result);
        sendGetAllPostsRequest();
    },
    error: function (error) {
        console.log(error);
    }
  });
}

function renderPostsList() {
  $('.posts-list').empty();

  const postsReversed = posts.reverse();

  postsReversed.forEach(post => {
    renderPost(post);
  });

  setPostEvents();
}

function setPostEvents() {
  $('.post-like-btn').on('click', function(event) {
    const postIndex = $(event.target).parent().parent().index();
    const postItem = posts[postIndex];

    if (activeUser.likedPosts.includes(postItem._id)) {
      postItem.likes--;
      activeUser.likedPosts = activeUser.likedPosts.filter(postId => postId != postItem._id);
      sendUpdateUserRequest(activeUser);
    } else {
      postItem.likes++;
      activeUser.likedPosts.push(postItem._id);
      sendUpdateUserRequest(activeUser);
    }

    sendUpdatePostRequest(postItem);
  })
}

function sendUpdateUserRequest(user) {
  $.ajax({
    url: 'http://localhost:3000/api/user/' + user._id,
    type: 'PUT',
    data: JSON.stringify(user),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        console.log(result);
        activeUser = result;
    },
    error: function (error) {
        console.log(error);
    }
});
}

function sendUpdatePostRequest(post) {
  console.log(post);

  $.ajax({
    url: 'http://localhost:3000/api/post/id/' + post._id,
    type: 'PUT',
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        console.log(result);
        sendGetAllPostsRequest();
    },
    error: function (error) {
        console.log(error);
    }
  });
}
