function profile() {
    renderNavbar();
    getUser(() => {
        createProfilePage();
        displayMyPosts();
        renderPost;
    });
}

function createProfilePage() {
    const body = $('body');
    const profileContainer = $('<div></div>').addClass('profile-container');
    const profileMain = $('<div></div>').addClass('profile-main');

    renderProfile(profileContainer);
    renderPostArea(profileContainer);

    profileMain.append(profileContainer);
    body.append(profileMain);
}

function getInitials() {
    const acronymList = activeUser.fullName.match(/\b\w/g);

    let firstNameLetter;
    let lastNameLetter;

    if (acronymList.length > 1) {
        firstNameLetter = acronymList[0].toUpperCase();
        lastNameLetter = acronymList[1].toUpperCase();
    } else {
        firstNameLetter = acronymList[0].toUpperCase();
        lastNameLetter = '';
    }

    return firstNameLetter + lastNameLetter;
}

function createPhoto(photoContainer) {
    const photo = $('<div></div>').addClass('profile-picture');
    const photoName = $('<div></div>').addClass('photo-name');

    photoName.html(`${getInitials()}`);
    photo.append(photoName);

    photoContainer.append(photo);
}

function renderProfile(profileContainer) {
    const userDetails = $('<div></div>').addClass('user-details');

    const photoContainer = $('<div></div>').addClass(
        'profile-picture-container'
    );
    createPhoto(photoContainer);

    const userInfo = $('<div></div>').addClass('user-info');
    const name = $('<p></p>').addClass('user-name');
    const username = $('<p></p>').addClass('username');
    const email = $('<p></p>').addClass('email');
    const gender = $('<p></p>').addClass('genre');

    name.html(activeUser.fullName);
    username.html(activeUser.username);
    email.html(activeUser.email);
    gender.html(activeUser.gender);

    userInfo.append(name);
    userInfo.append(username);
    userInfo.append(email);
    userInfo.append(gender);

    userDetails.append(photoContainer);
    userDetails.append(userInfo);

    profileContainer.append(userDetails);
}

function renderPostArea(profileContainer) {
    const profilePosts = $('<div></div>').addClass('profile-posts-section');
    const postsHeader = $('<div></div>').addClass('posts-header');
    const postsList = $('<div></div>').addClass('posts-list');

    const myPosts = $('<div></div>').addClass(
        'profile-posts my-posts selected'
    );
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
    profilePosts.append(postsList);
    profileContainer.append(profilePosts);
}

function deselectAll() {
    $('.selected').removeClass('selected');
}

function selectElement(element) {
    deselectAll();
    element.addClass('selected');
}

function displayMyPosts() {
    const userId = localStorage.getItem('userId');

    $.ajax({
        url: `http://localhost:3000/api/user/${userId}/posts`,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: (postList) => {
            renderPosts(postList, displayMyPosts);
        },
        error: function(error){
            toastr['error']('An error has occured, please try again later!', 'Error', toastrOptions);
        }
    });
}

function displayLikedPosts() {
    const userId = localStorage.getItem('userId');

    $.ajax({
        url: `http://localhost:3000/api/user/${userId}/posts?type=liked`,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: (postList) => {
            renderPosts(postList, displayLikedPosts);
        },
        error: function(error){
            toastr['error']('An error has occured, please try again later!', 'Error', toastrOptions);
        }
    });
}

function displaySavedPosts() {
    const userId = localStorage.getItem('userId');

    $.ajax({
        url: `http://localhost:3000/api/user/${userId}/posts?type=saved`,
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: (postList) => {
            renderPosts(postList, displaySavedPosts);
        },
        error: function(error){
            toastr['error']('An error has occured, please try again later!', 'Error', toastrOptions);
        }
    });
}

$(() => {
    checkPagePermission(() => {
        profile();
    });
});
