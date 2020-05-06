function profile() {
    renderNavbar();
    getUser();
}

function createProfilePage(user) {
    const body= $('body');
    const profileMain = $('<div></div>').addClass('profile-main');
    const profileContainer = $('<div></div>').addClass('profile-container');
    const userDetails = $('<div></div>').addClass('user-details');
    const profilePosts = $('<div></div>').addClass('profile-posts-section');
    const postsHeader = $('<div></div>').addClass('posts-header');

    const acronymList = user.name.match(/[A-Z]/g);

    const firstName = acronymList[0];
    const lastName = acronymList[1];

    const photoContainer = $('<div></div>').addClass(
        'profile-picture-container'
    );

    const photo = $('<div></div>').addClass('profile-picture');

    const photoName = $('<div></div>').addClass('photo-name');

    photoName.html(`${firstName}${lastName}`);
    photo.append(photoName);

    photoContainer.append(photo);

    const userInfo = $('<div></div>').addClass('user-info');
    const name = $('<p></p>').addClass('user-name');
    const username = $('<p></p>').addClass('username');
    const email = $('<p></p>').addClass('email');
    const gender = $('<p></p>').addClass('genre');

    const myPosts = $('<div></div>').addClass('profile-posts my-posts');
    const likedPosts = $('<div></div>').addClass('profile-posts liked-posts');
    const savedPosts = $('<div></div>').addClass('profile-posts liked-posts');

    myPosts.click(() => {
        getMyPosts();
    });

    likedPosts.click(() => {
        getLikedPosts();
    });

    savedPosts.click(() => {
        getSavedPosts();
    });

    myPosts.html('My Posts');
    likedPosts.html('Liked Posts');
    savedPosts.html('Saved Posts');

    postsHeader.append(myPosts);
    postsHeader.append(likedPosts);
    postsHeader.append(savedPosts);

    name.html(user.name);
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

    profilePosts.append(postsHeader);
    profileContainer.append(profilePosts);

    profileMain.append(profileContainer);
    body.append(profileMain);
}

function getUser() {
    createProfilePage({
        name: 'Nume si Prenume',
        username: 'Username',
        email: 'internship@springtech.com',
        gender: 'Female',
    });
}

$(() => {
    // shared
    profile();
});
