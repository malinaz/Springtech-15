function profile() {
    renderNavbar();
    getUser();
}

function createProfilePage(user) {
    const body = $('body');
    const profileMain = $('<div></div>').addClass('profile-main');
    const profileContainer = $('<div></div>').addClass('profile-container');
    const userDetails = $('<div></div>').addClass('user-details');
    const profilePosts = $('<div></div>').addClass('profile-posts-section');
    const postsHeader = $('<div></div>').addClass('posts-header');

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

    const photoContainer = $('<div></div>').addClass(
        'profile-picture-container'
    );

    const photo = $('<div></div>').addClass('profile-picture');

    const photoName = $('<div></div>').addClass('photo-name');

    photoName.html(`${firstNameLetter}${lastNameLetter}`);
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

    profilePosts.append(postsHeader);
    profileContainer.append(profilePosts);

    profileMain.append(profileContainer);
    body.append(profileMain);
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
            },
        });
    }
}

$(() => {
    // shared
    profile();
});
