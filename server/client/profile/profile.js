function profile() {
    renderNavbar();
    getUser();
}

var user;

function createProfilePage(userData) {

    user = userData;

    const body = $('body');
    const profileContainer = $('<div></div>').addClass('profile-container');
    const profileMain = $('<div></div>').addClass('profile-main');

    renderProfile(profileContainer);
    renderPostArea(profileContainer);

    profileMain.append(profileContainer);
    body.append(profileMain);
}

function getInitials(user){
    const acronymList = user.fullName.match(/\b\w/g);

    let firstNameLetter;
    let lastNameLetter;

    if (acronymList.length > 1) {
        firstNameLetter = acronymList[0].toUpperCase();
        lastNameLetter = acronymList[1].toUpperCase();
    } else {
        firstNameLetter = acronymList[0].toUpperCase();
        lastNameLetter = '';
    }

    return firstNameLetter+lastNameLetter;
}

function createPhoto(photoContainer) {
    const photo = $('<div></div>').addClass('profile-picture');
    const photoName = $('<div></div>').addClass('photo-name');

    photoName.html(`${getInitials(user)}`);
    photo.append(photoName);

    photoContainer.append(photo);
}

function renderProfile(profileContainer){

    const userDetails = $('<div></div>').addClass('user-details');

    const photoContainer = $('<div></div>').addClass('profile-picture-container');
    createPhoto(photoContainer);

    const userInfo = $('<div></div>').addClass('user-info');
    const name = $('<p></p>').addClass('user-name');
    const username = $('<p></p>').addClass('username');
    const email = $('<p></p>').addClass('email');
    const gender = $('<p></p>').addClass('genre');

    name.html(user.fullName);
    username.html(user.username);
    email.html(user.email);
    gender.html(user.gender);

    userInfo.append(name);
    userInfo.append(username);
    userInfo.append(email);
    userInfo.append(gender);

    userDetails.append(photoContainer);
    userDetails.append(userInfo);

    profileContainer.append(userDetails);
}

function renderPostArea(profileContainer){

    const profilePosts = $('<div></div>').addClass('profile-posts-section');
    const postsHeader = $('<div></div>').addClass('posts-header');
    const postsContent = $('<div></div>').addClass('posts-content');

    const myPosts = $('<div></div>').addClass('profile-posts my-posts selected');
    const likedPosts = $('<div></div>').addClass('profile-posts liked-posts');
    const savedPosts = $('<div></div>').addClass('profile-posts liked-posts');

    myPosts.click(() => {
        selectElement(myPosts);
        displayMyPosts();
    });

    likedPosts.click(() => {
        selectElement(likedPosts);
        displayLikedPosts();
    });

    savedPosts.click(() => {
        selectElement(savedPosts);
        displaySavedPosts();
    });

    myPosts.html('My Posts');
    likedPosts.html('Liked Posts');
    savedPosts.html('Saved Posts');

    postsHeader.append(myPosts);
    postsHeader.append(likedPosts);
    postsHeader.append(savedPosts);

    profilePosts.append(postsHeader);
    profilePosts.append(postsContent);
    profileContainer.append(profilePosts);
}

function deselectAll() {
    $('.selected').removeClass('selected');
}

function selectElement(element) {
    deselectAll();
    element.addClass('selected');
}

function getUser() {
    const userId = localStorage.getItem('userId');
    console.log(userId);

    if (userId) {
        $.ajax({
            url: `http://localhost:3000/api/user/${userId}`,
            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            success: (data) => {
                console.log(data);
                createProfilePage(data);
                displayMyPosts();
            },
        });
    }
}

function displayMyPosts() {
    const userId = localStorage.getItem('userId');

    $.ajax({
        url: `http://localhost:3000/api/user/${userId}/posts`,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: renderPosts,
    });
}

function constructPostElement(onePost) {
    //console.log(onePost);
    const photoContainer = $('<div></div>').addClass(
        'post-author-picture-container'
    );

    const photo = $('<div></div>').addClass('post-author-profile-picture');

    const photoName = $('<div></div>').addClass('post-author-photo-name');

    photoName.html(`${getInitials(onePost.userId)}`);
    photo.append(photoName);

    photoContainer.append(photo);

    const postElement = $('<div></div>').addClass('post-element');
    const authorName = $('<div></div>').addClass('post-author-fullname');
    const postTextContent = $('<div></div>').addClass('post-text-content');
    const likeCount = $('<div></div>').addClass('post-like-count');
    const commentCount = $('<div></div>').addClass('post-comment-count');

    authorName.html(`${onePost.userId.fullName}`);
    postTextContent.html(`${onePost.text}`);
    likeCount.html(`Likes: ${onePost.likes}`);
    commentCount.html(`Comments: ${onePost.comments.length}`);

    postElement.append(photoContainer);
    postElement.append(authorName);
    postElement.append(postTextContent);
    postElement.append(likeCount);
    postElement.append(commentCount);

    return postElement;
}

function renderPosts(postList) {
    const postsContent = $('.posts-content');
    postsContent.empty();
    if (postList.length > 0) {
        for (let post of postList) {
            postsContent.append(constructPostElement(post));
        }
    } else {
        const emptyWrapper = $('<div></div>').addClass('posts-empty-wrapper');
        const emptyMessage = $('<div></div>').addClass('posts-empty-message');
        emptyMessage.html('No posts to display!');
        emptyWrapper.append(emptyMessage);
        postsContent.append(emptyWrapper);
    }
}

function displayLikedPosts() {
    const userId = localStorage.getItem('userId');

    $.ajax({
        url: `http://localhost:3000/api/user/${userId}/posts?type=liked`,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: renderPosts,
    });
}

function displaySavedPosts() {
    const userId = localStorage.getItem('userId');

    $.ajax({
        url: `http://localhost:3000/api/user/${userId}/posts?type=saved`,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: renderPosts,
    });
}

$(() => {
    // shared
    checkPagePermission(() => {
        profile();
    });
});
