window.onload = init;

function init() {
    getUser();
    renderNavbar();
    sendGetAllPostsRequest();
    setPageEvents();
}

function sendGetAllPostsRequest() {
    $.ajax({
        url: 'http://localhost:3000/api/post/all',
        type: 'GET',
        success: function (result) {
            renderPosts(result, sendGetAllPostsRequest);
        },
        error: function (error) {
          toastr['error']('Failed to retrieve posts!', 'Error', toastrOptions);
        },
    });
}

function setPageEvents() {
    $('.btn-add-new').on('click', function () {
        checkPagePermission(() => {
            const postText = $('.post-input').val();

            if (postText.trim() != '') {
                sendAddPostRequest(postText);
            }
            $('.post-input').val('');
        });
    });
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
        toastr['success']('Post created successfully!', 'Success', toastrOptions);
        sendGetAllPostsRequest();
    },
    error: function (error) {
        toastr['error']('Failed to create new post!', 'Error', toastrOptions);
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
  // like
  $('.post-like-btn').on('click', function(event) {
    const postIndex = $(event.target).parent().parent().index();
    const postItem = posts[postIndex];
    if (activeUser.likedPosts.includes(postItem._id)) {
      postItem.likes--;
      activeUser.likedPosts = activeUser.likedPosts.filter(postId => postId != postItem._id);
    } else {
      postItem.likes++;
      activeUser.likedPosts.push(postItem._id);
    }

    sendUpdateUserRequest(activeUser);
    sendUpdatePostRequest(postItem);
  });

  // save
  $('.post-save-btn').on('click', function(event) {
    const postIndex = $(event.target).parent().parent().index();
    const postItem = posts[postIndex];

    if (!activeUser.savedPosts.includes(postItem._id)) {
      activeUser.savedPosts.push(postItem._id);
      sendUpdateUserRequest(activeUser);
    }
  });

  // more options
  $('.post-options-btn').on('click', function(event) {
    const postElement = $(event.target).parent().parent();

    if ($(postElement).has('.options-list').length != 0) {
      postElement.children('.options-list').remove();
    } else {
      renderOptionsMenu(postElement);
      setOptionsMenuEvents();
    }
  });

  // comment
  $('.post-comments-btn').on('click', function(event) {
    const postElement = $(event.target).parent().parent();
    const postItem = posts[postElement.index()];

    if ($(postElement).has('.comment-section').length != 0) {
      postElement.children('.comment-section').remove();
    } else {
      renderCommentSection(postElement, postItem);
    }
  })
}

function renderCommentSection(htmlElement, post) {
  let commentSection =  $('<div></div>').addClass('comment-section');
  let addNewComment = $('<div></div>').addClass('section-add-comment');
  let commentsList = $('<div></div>').addClass('section-comments-list');
  const input = $('<input>').addClass('add-comment-input').attr('type', 'text').attr('placeholder', 'Write a comment...');
  const addCommentBtn = $('<button></button>').addClass('add-comment-btn').text('Add');

  addNewComment.append(input, addCommentBtn);
  commentSection.append(addNewComment, commentsList);

  htmlElement.append(commentSection);
  sendGetPostCommentsRequest(htmlElement, post);
  setCommentSectionEvents(htmlElement, post);
}

function setCommentSectionEvents(htmlElement, post) {
  $('.add-comment-btn').on('click', function() {
    const text = htmlElement.children('.comment-section').children('.section-add-comment').children('.add-comment-input').val();

    const comment = {
      text: text,
      postId: post._id,
      userId: activeUser._id
    };

    if (comment.text.trim() != 0) {
      post.comments.push(comment);
      sendAddCommentRequest(comment);
      sendUpdatePostRequest(post);
    }
  });
}

function sendAddCommentRequest(comment) {
  $.ajax({
    url: 'http://localhost:3000/api/comment/',
    type: 'POST',
    data: JSON.stringify(comment),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        toastr['success']('Comment added successfully!', 'Success', toastrOptions);
    },
    error: function (error) {
        toastr['error']('Could not add comment!', 'Error', toastrOptions);
    }
  });
}

function sendGetPostCommentsRequest(htmlElement, post) {
  $.ajax({
    url: 'http://localhost:3000/api/comment/' + post._id,
    type: 'GET',
    success: function (result) {
        const comments = result;
        renderCommentsList(htmlElement, comments);
    },
    error: function (error) {
        toastr['error']('Could not retrieve comment data!', 'Error', toastrOptions);
    }
  });
}

function renderCommentsList(htmlElement, comments) {
  const commentsReversed = comments.reverse();

  commentsReversed.forEach(comment => {
    let commentItem = $('<div></div>').addClass('comment-item');
    const commentAuthor = $('<div></div>').addClass('comment-author').text(comment.userId.username);
    const commentText = $('<div></div>').addClass('comment-text').text(comment.text);

    commentItem.append(commentAuthor, commentText);
    htmlElement.children('.comment-section').children('.section-comments-list').append(commentItem);
  });
}

function setOptionsMenuEvents() {
  $('.option-delete').on('click', function(event) {
    const postIndex = $(event.target).parent().parent().index();
    const postItem = posts[postIndex];

    sendDeletePostRequest(postItem);
  });

  $('.option-update').on('click', function(event) {
    const postIndex = $(event.target).parent().parent().index();
    const postItem = posts[postIndex];

    renderUpdateForm(postItem);
  });
}

function renderUpdateForm(post) {
  let editForm = $('<div></div>').addClass('edit-form');
  const overlay = $('<div></div>').addClass('overlay');
  let formBox = $('<div></div>').addClass('form-box');
  const input = $('<textarea></textarea>').addClass('edit-input').val(post.text).attr('rows', '5');
  let formOptions = $('<div></div>').addClass('form-options');
  const updateBtb = $('<button></button>').addClass('update-btn').text('Update');
  const cancelBtb = $('<button></button>').addClass('cancel-btn').text('Cancel');

  formOptions.append(updateBtb, cancelBtb)
  formBox.append(input, formOptions)
  editForm.append(overlay, formBox);

  const topScroll = $(window).scrollTop();

  editForm.css("top", topScroll+'px');

  $('body').append(editForm);
  $('body').addClass('noscroll');

  setUpdateFormEvents(post);
}

function setUpdateFormEvents(post) {
  $('.cancel-btn').on('click', function() {
    $('.edit-form').remove();
    $('body').removeClass('noscroll');
  });

  $('.update-btn').on('click', function() {
    const newText = $('.edit-input').val();
    post.text = newText;

    sendUpdatePostRequest(post);
    $('.edit-form').remove();
    $('body').removeClass('noscroll');
  });
}

function sendDeletePostRequest(post) {
  $.ajax({
    url: 'http://localhost:3000/api/post/' + post._id,
    type: 'DELETE',
    success: function (result) {
        toastr['success']('Post has been deleted!', 'Success', toastrOptions);
        sendGetAllPostsRequest();
    },
    error: function (error) {
        toastr['error']('Could not delete post!', 'Error', toastrOptions);
    }
  });
}

function sendUpdateUserRequest(user) {
  $.ajax({
    url: 'http://localhost:3000/api/user/' + user._id,
    type: 'PUT',
    data: JSON.stringify(user),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        activeUser = result;
    },
    error: function (error) {
        toastr['error']('Could not complete operation!', 'Error', toastrOptions);
    }
  });
}

function sendUpdatePostRequest(post) {
  $.ajax({
    url: 'http://localhost:3000/api/post/' + post._id,
    type: 'PUT',
    data: JSON.stringify(post),
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        toastr['success']('Updated post!', 'Success', toastrOptions);
        sendGetAllPostsRequest();
    },
    error: function (error) {
        toastr['error']('Could not complete operation!', 'Error', toastrOptions);
    }
  });
}





    const post = {
        text: postText,
        userId: activeUser._id,
    };

    $.ajax({
        url: 'http://localhost:3000/api/post/',
        type: 'POST',
        data: JSON.stringify(post),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
          toastr['success']('Post created successfully!', 'Success', toastrOptions);
          sendGetAllPostsRequest();
        },
        error: function (error) {
          toastr['error']('Failed to create new post!', 'Error', toastrOptions);
        },
    });

