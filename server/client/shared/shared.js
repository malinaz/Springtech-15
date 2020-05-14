function renderNavbar() {
    let navbar = $('<nav></nav>').addClass('navbar');
    let nav = $('<div></div>').addClass('nav');
    let navList = $('<div></div>').addClass('nav-list');
    let logo = $('<div></div>').addClass('logo');
    let dropdown = $('<div></div>').addClass('dropdown');
    const logoIcon = $('<i></i>').addClass('fas fa-atom');
    const newsFeed = $('<a></a>').addClass('list-item').text('News Feed').attr('href', '/feed');
    const profile = $('<a></a>').addClass('list-item').text('Profile').attr('href', '/profile');
    const logOut = $('<a></a>').addClass('list-item').text('Log Out').attr('href', '/login');
    const dropdownBtn = $('<div></div>').addClass('dropdown-btn');
    const dropdownIcon = $('<i></i>').addClass('fas fa-bars');

    logo.append(logoIcon);
    dropdownBtn.append(dropdownIcon);
    navList.append(newsFeed, profile, logOut);
    dropdown.append(navList, dropdownBtn);
    nav.append(logo, dropdown);
    navbar.append(nav);

    $('body').prepend(navbar);
    setNabvarEvents();
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