let activeUser;

function renderNavbar() {
    let navbar = $('<nav></nav>').addClass('navbar');
    let nav = $('<div></div>').addClass('nav');
    let navList = $('<div></div>').addClass('nav-list');
    let logo = $('<div></div>').addClass('logo');
    let dropdown = $('<div></div>').addClass('dropdown');
    const logoIcon = $('<i></i>').addClass('fas fa-atom');
    const newsFeed = $('<a></a>')
        .addClass('list-item')
        .text('News Feed')
        .attr('href', '/feed');
    const profile = $('<a></a>')
        .addClass('list-item')
        .text('Profile')
        .attr('href', '/profile');
    const logOut = $('<a></a>').addClass('list-item').text('Log Out');
    const logIn = $('<a></a>')
        .addClass('list-item')
        .text('Log In')
        .attr('href', '/login');
    const dropdownBtn = $('<div></div>').addClass('dropdown-btn');
    const dropdownIcon = $('<i></i>').addClass('fas fa-bars');

    logo.append(logoIcon);
    dropdownBtn.append(dropdownIcon);
    navList.append(newsFeed, profile, logOut, logIn);
    dropdown.append(navList, dropdownBtn);
    nav.append(logo, dropdown);
    navbar.append(nav);

    checkIsLoggedIn(
        () => {
            logIn.remove();
            logOut.show();
        },
        () => {
            logOut.remove();
            profile.hide();
            logIn.show();
        }
    );

    logOut.click(() => {
        clear(navbar);
        renderNavbar();
    });

    $('body').prepend(navbar);
    setNabvarEvents();
}

var toastrOptions = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: 'toast-bottom-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '10000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
};

function setNabvarEvents() {
    $('.list-item').on('click', function (event) {
        const target = $(event.target);
        if (target.text() == 'Log Out') {
            localStorage.removeItem('userId');
        }
    });
}

function renderPost(post) {
    let postItem = $('<div></div>').addClass('post-item');
    const postAuthor = $('<div></div>')
        .addClass('post-author')
        .text(post.userId.username);
    const text = $('<p></p>').text(post.text);
    const postText = $('<div></div>').addClass('post-text');
    let postActions = $('<div></div>').addClass('post-actions');
    const postLikeBtn = $('<button></button>')
        .addClass('post-like-btn fas fa-thumbs-up')
        .text(' ' + post.likes);

    const postSaveBtn = $('<button></button>')
        .addClass('post-save-btn')
        .text('Save');
    const postCommentsBtn = $('<button></button>')
        .addClass('post-comments-btn fas fa-comment-dots')
        .text(' ' + post.comments.length);
    const postOptionsBtn = $('<button></button>').addClass(
        'post-options-btn fas fa-ellipsis-v'
    );

    postText.append(text);
    postActions.append(postLikeBtn, postCommentsBtn);

    if (post.userId._id === localStorage.getItem('userId')) {
        postActions.append(postOptionsBtn);
    } else if (activeUser && !activeUser.savedPosts.includes(post._id)) {
        postActions.append(postSaveBtn);
    }

    postItem.append(postAuthor, postText, postActions);

    if (post.userId._id == localStorage.getItem('userId')) {
        postItem.addClass('dashed-border');
    }

    $('.posts-list').append(postItem);
}

function renderOptionsMenu(post) {
    let optionsList = $('<div></div>').addClass('options-list');
    const updateOption = $('<button></button>')
        .addClass('option-item option-update')
        .text('Update');
    const deleteOption = $('<button></button>')
        .addClass('option-item option-delete')
        .text('Delete');

    optionsList.append(updateOption, deleteOption);
    post.append(optionsList);
}

function clear(navbar) {
    navbar.remove();
    localStorage.clear();
}

function checkIsLoggedIn(success, fail) {
    const user = localStorage.getItem('userId');
    if (user) {
        success();
    } else {
        fail();
    }
}

function checkPagePermission(success) {
    checkIsLoggedIn(success, () => (window.location = '/login'));
}

function setPostEvents(postList, updatePost) {
    // like
    $('.post-like-btn').on('click', function (event) {
        checkPagePermission(() => {
            const postIndex = $(event.target).parent().parent().index();
            const postItem = postList[postIndex];

            if (activeUser.likedPosts.includes(postItem._id)) {
                postItem.likes--;
                activeUser.likedPosts = activeUser.likedPosts.filter(
                    (postId) => postId != postItem._id
                );
            } else {
                postItem.likes++;
                activeUser.likedPosts.push(postItem._id);
            }

            sendUpdateUserRequest(activeUser);
            sendUpdatePostRequest(postItem, updatePost);
        });
    });

    // save
    $('.post-save-btn').on('click', function (event) {
        const postIndex = $(event.target).parent().parent().index();
        const postItem = postList[postIndex];

        if (!activeUser.savedPosts.includes(postItem._id)) {
            activeUser.savedPosts.push(postItem._id);
            sendUpdateUserRequest(activeUser);
            sendUpdatePostRequest(postItem, updatePost);
        }
    });

    // more options
    $('.post-options-btn').on('click', function (event) {
        const postElement = $(event.target).parent().parent();

        if ($(postElement).has('.options-list').length != 0) {
            postElement.children('.options-list').remove();
        } else {
            renderOptionsMenu(postElement);
            setOptionsMenuEvents(postList, updatePost);
        }
    });

    // comment
    $('.post-comments-btn').on('click', function (event) {
        const postElement = $(event.target).parent().parent();
        const postItem = postList[postElement.index()];

        if ($(postElement).has('.comment-section').length != 0) {
            postElement.children('.comment-section').remove();
        } else {
            renderCommentSection(postElement, postItem, updatePost);
        }
    });
}

function renderCommentSection(htmlElement, post, updatePost) {
    let commentSection = $('<div></div>').addClass('comment-section');
    let addNewComment = $('<div></div>').addClass('section-add-comment');
    let commentsList = $('<div></div>').addClass('section-comments-list');
    const input = $('<input>')
        .addClass('add-comment-input')
        .attr('type', 'text')
        .attr('placeholder', 'Write a comment...');
    const addCommentBtn = $('<button></button>')
        .addClass('add-comment-btn')
        .text('Add');

    addNewComment.append(input, addCommentBtn);
    commentSection.append(addNewComment, commentsList);

    htmlElement.append(commentSection);
    sendGetPostCommentsRequest(htmlElement, post);
    setCommentSectionEvents(htmlElement, post, updatePost);
}

function setCommentSectionEvents(htmlElement, post, updatePost) {
    $('.add-comment-btn').on('click', function () {
        checkPagePermission(() => {
            const text = htmlElement
                .children('.comment-section')
                .children('.section-add-comment')
                .children('.add-comment-input')
                .val();

            const comment = {
                text: text,
                postId: post._id,
                userId: activeUser._id,
            };

            if (comment.text.trim() != 0) {
                post.comments.push(comment);
                sendAddCommentRequest(comment);
                sendUpdatePostRequest(post, updatePost);
            }
        });
    });
}

function sendAddCommentRequest(comment) {
    $.ajax({
        url: 'http://localhost:3000/api/comment/',
        type: 'POST',
        data: JSON.stringify(comment),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            console.log(result);
        },
        error: function (error) {
            console.log(error);
        },
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
            console.log(error);
        },
    });
}

function renderCommentsList(htmlElement, comments) {
    const commentsReversed = comments.reverse();

    commentsReversed.forEach((comment) => {
        let commentItem = $('<div></div>').addClass('comment-item');
        const commentAuthor = $('<div></div>')
            .addClass('comment-author')
            .text(comment.userId.username);
        const commentText = $('<div></div>')
            .addClass('comment-text')
            .text(comment.text);

        commentItem.append(commentAuthor, commentText);
        htmlElement
            .children('.comment-section')
            .children('.section-comments-list')
            .append(commentItem);
    });
}

function setOptionsMenuEvents(postList, updatePost) {
    $('.option-delete').on('click', function (event) {
        const postIndex = $(event.target).parent().parent().index();
        const postItem = postList[postIndex];

        sendDeletePostRequest(postItem, updatePost);
    });

    $('.option-update').on('click', function (event) {
        const postIndex = $(event.target).parent().parent().index();
        const postItem = postList[postIndex];

        renderUpdateForm(postItem, updatePost);
    });
}

function renderUpdateForm(post, updatePost) {
    let editForm = $('<div></div>').addClass('edit-form');
    const overlay = $('<div></div>').addClass('overlay');
    let formBox = $('<div></div>').addClass('form-box');
    const input = $('<textarea></textarea')
        .addClass('edit-input')
        .val(post.text)
        .attr('rows', '5');
    let formOptions = $('<div></div>').addClass('form-options');
    const updateBtb = $('<button></button>')
        .addClass('update-btn')
        .text('Update');
    const cancelBtb = $('<button></button>')
        .addClass('cancel-btn')
        .text('Cancel');

    formOptions.append(updateBtb, cancelBtb);
    formBox.append(input, formOptions);
    editForm.append(overlay, formBox);

    const topScroll = $(window).scrollTop();

    editForm.css('top', topScroll + 'px');

    $('body').append(editForm);
    $('body').addClass('noscroll');

    setUpdateFormEvents(post, updatePost);
}

function setUpdateFormEvents(post, updatePost) {
    $('.cancel-btn').on('click', function () {
        $('.edit-form').remove();
        $('body').removeClass('noscroll');
    });

    $('.update-btn').on('click', function () {
        const newText = $('.edit-input').val();
        post.text = newText;

        sendUpdatePostRequest(post, updatePost);
        $('.edit-form').remove();
        $('body').removeClass('noscroll');
    });
}

function sendDeletePostRequest(post, updatePost) {
    $.ajax({
        url: 'http://localhost:3000/api/post/' + post._id,
        type: 'DELETE',
        success: function () {
            updatePost();
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function sendUpdateUserRequest(user) {
    $.ajax({
        url: 'http://localhost:3000/api/user/' + user._id,
        type: 'PUT',
        data: JSON.stringify(user),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            activeUser = result;
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function sendUpdatePostRequest(post, updatePost) {
    $.ajax({
        url: 'http://localhost:3000/api/post/' + post._id,
        type: 'PUT',
        data: JSON.stringify(post),
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            updatePost();
        },
        error: function (error) {
            console.log(error);
        },
    });
}

function getUser(success) {
    const userId = localStorage.getItem('userId');

    if (userId) {
        $.ajax({
            url: `http://localhost:3000/api/user/${userId}`,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: (data) => {
                activeUser = data;
                if (data && success) {
                    success(data);
                }
            },
            error: () => {
                toastr['error'](
                    'Failed to retrieve user!',
                    'Error',
                    toastrOptions
                );
            },
        });
    }
}

function renderPosts(postList, updatePosts) {
    $('.posts-list').empty();

    const postsReversed = postList.reverse();

    postsReversed.forEach((post) => {
        renderPost(post);
    });

    setPostEvents(postList, updatePosts);
}
