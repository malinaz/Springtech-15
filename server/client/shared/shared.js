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
    const friends = $('<a></a>')
        .addClass('list-item')
        .text('Friends')
        .attr('href', '/friends');
    const logOut = $('<a></a>').addClass('list-item').text('Log Out');
    const logIn = $('<a></a>')
        .addClass('list-item')
        .text('Log In')
        .attr('href', '/login');
    const dropdownBtn = $('<div></div>').addClass('dropdown-btn');
    const dropdownIcon = $('<i></i>').addClass('fas fa-bars');

    logo.append(logoIcon);
    dropdownBtn.append(dropdownIcon);
    navList.append(newsFeed, profile, friends, logOut, logIn);
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
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "10000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

function setNabvarEvents() {
    $('.list-item').on('click', function(event) {
        const target = $(event.target);
        if (target.text() == "Log Out") {
            localStorage.removeItem('userId');
        }
    })
}

function renderPost(post) {
    let postItem = $('<div></div>').addClass('post-item');
    const postAuthor = $('<div></div>').addClass('post-author').text(post.userId.username);
    const text = $('<p></p>').text(post.text);
    const postText = $('<div></div>').addClass('post-text');
    let postActions = $('<div></div>').addClass('post-actions');
    const postLikeBtn = $('<button></button>').addClass('post-like-btn fas fa-thumbs-up').text(' ' + post.likes);
    const postSaveBtn = $('<button></button>').addClass('post-save-btn').text('Save');
    const postCommentsBtn = $('<button></button>').addClass('post-comments-btn fas fa-comment-dots').text(' ' + post.comments.length);
    const postOptionsBtn = $('<button></button>').addClass('post-options-btn fas fa-ellipsis-v');

    postText.append(text);
    postActions.append(postLikeBtn, postCommentsBtn);

    if (post.userId._id == localStorage.getItem('userId')) {
        postActions.append(postOptionsBtn);

    } else {
        postActions.append(postSaveBtn);

        //we only want to send requests to others
        postAuthor.click( () => {
            const userId = localStorage.getItem('userId');
            if (userId !== null) {
                checkIfRequestSent(userId, post.userId._id, (response) => {
                    renderSendRequestPopUp(response, postItem, userId, post.userId._id);
                })
            } else {

            }
        })
    }

    postItem.append(postAuthor, postText, postActions);

    if (post.userId._id == localStorage.getItem('userId')) {
        postItem.addClass('dashed-border');
    }

    $('.posts-list').append(postItem);

}

function renderOptionsMenu(post) {
    let optionsList = $('<div></div>').addClass('options-list');
    const updateOption = $('<button></button>').addClass('option-item option-update').text('Update');
    const deleteOption = $('<button></button>').addClass('option-item option-delete').text('Delete');

    optionsList.append(updateOption, deleteOption);
    post.append(optionsList);
}


function renderSendRequestPopUp(ok, post, myId, friendId) {
    $('.request-popup').remove();
    const popUp = $('<div></div>').addClass('request-popup');
    popUp.click( () => {
        popUp.remove();
    })
    if (!ok) {
        const message = $('<p>Send a friend request!</p>');

        const sendRequestBtn = $('<button></button>').addClass('send-request-btn').text('Send Request');
        sendRequestBtn.click( () => {
            sendFriendRequest(myId, friendId, (response) => {
                toastr['success']('Request sent!', 'Success', toastrOptions);
            })
        })

        popUp.append(message);
        popUp.append(sendRequestBtn);

    } else {
        const message = $('<p>Request sent!</p>');

        const cancelRequestBtn = $('<button></button>').addClass('cancel-request-btn').text('Cancel Request');
        cancelRequestBtn.click( () => {
            cancelFriendRequest(myId, friendId, (response) => {
                toastr['success']('Request canceled!', 'Success', toastrOptions);
            })
        })

        popUp.append(message);
        popUp.append(cancelRequestBtn);
    }
    post.append(popUp);
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

function checkIfRequestSent(myId, friendId, callback) {
    $.ajax({
        url: `http://localhost:3000/api/user/check-request/${myId}/${friendId}`,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            callback(response);
        },
        error: function (error) {
            toastr['error']('A connection error has occured!', 'Connection Failure', toastrOptions);
        }
    });
}

function sendFriendRequest(myId, friendId, callback) {
    $.ajax({
        url: `http://localhost:3000/api/user/send-request/${myId}/${friendId}`,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            callback(response);
        },
        error: function (error) {
            toastr['error']('A connection error has occured!', 'Connection Failure', toastrOptions);
        }
    });
}

function cancelFriendRequest(myId, friendId, callback) {
    $.ajax({
        url: `http://localhost:3000/api/user/cancel-request/${myId}/${friendId}`,
        type: 'GET',
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            callback(response);
        },
        error: function (error) {
            toastr['error']('A connection error has occured!', 'Connection Failure', toastrOptions);
        }
    });
}


