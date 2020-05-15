const SERVER_URL = 'http://localhost:3000';
const userId = localStorage.getItem('userId');

let requests = []
let friends = []


const container = $('<div class="container"></div>');
const subContainer = $('<div class="subcontainer"></div>');
const requests_div = $('<div class="requests-box"></div>')
const friends_div = $('<div class="friends-box"></div>')

function renderFriendsPage() {
    container.remove()
    $('body').append(container)

    subContainer.append(requests_div)
    subContainer.append(friends_div)

    container.append(subContainer);

    renderRequests()
    renderFriends()
}

function initFriendsBoxEvents(unfriendBtn, index) {
    unfriendBtn.click( () => {
        deleteFriend(userId, friends[index]._id, (response) => {
            friends.splice(index,1);
            console.log("ce plm");
            renderFriends();
            toastr['success']('Friend deleted!', 'Success', toastrOptions);
        })
    })
}

function renderFriends() {
    friends_div.empty();
    const friendsBar = $('<div class="friends-bar"></div>')

    friendsBar.append($('<p class="title">MY FRIENDS:</p>'))
    friendsBar.append($('<i class="fas fa-bell fa-2x"></i>'))
    friends_div.append(friendsBar)
    const friendsList_ul = $('<ul class="friends-list"></ul>')

    for (let i = 0; i < friends.length; i++) {
        const friendContainer_div = $('<div class="friend-container"></div>')

        const initials = friends[i].fullName.split(" ").map((n)=>n[0]).join(".")
        const avatar_div = $('<div class="avatar"></div>').append($(`<p>${initials}</p>`))

        const name_p = $('<p class="name"></p>').append(friends[i].fullName)

        const unfriend_btn = $('<button class="unfriend-btn">Unfriend</button>')

        friendContainer_div.append(avatar_div)
        friendContainer_div.append(name_p)
        friendContainer_div.append(unfriend_btn)

        const listElement_li = $('<li></li>')
        listElement_li.append(friendContainer_div)

        friendsList_ul.append(listElement_li)

        initFriendsBoxEvents(unfriend_btn, i);

    }
    friends_div.append(friendsList_ul)
}


function renderRequests() {
    requests_div.empty();
    requests_div.append($('<p class="title">New Requests:</p>'))

    const requestList_ul = $('<ul class="requests-list"></ul>')

    for (let i = 0; i < requests.length; i++) {

        const requestContainer_div = $('<div class="request-container"></div>')

        const initials = requests[i].fullName.split(" ").map((n)=>n[0]).join(".")
        const avatar_div = $('<div class="avatar"></div>').append($(`<p>${initials}</p>`))

        const name_p = $('<p class="name"></p>').append(requests[i].fullName)

        const btnContainer_div = $('<div class="btn-container"></div>')

        const accept_btn = $('<button class="accept-btn">Accept</button>')
        accept_btn.click( () => {
            acceptFriendRequest(userId, requests[i]._id, (response) => {
                cancelFriendRequest(userId, requests[i]._id, (response) => {
                    friends.push(requests[i]);
                    requests.splice(i,1);

                    renderRequests();
                    renderFriends();

                    toastr['success']('Request accepted!', 'Success', toastrOptions);
                })

            })
        })

        const reject_btn = $('<button class="reject-btn">Reject</button>')
        reject_btn.click( () => {
            cancelFriendRequest(userId, requests[i]._id, (response) => {
                requests.splice(i,1);

                renderRequests();

                toastr['success']('Request rejected!', 'Success', toastrOptions);
            })
        })

        btnContainer_div.append(accept_btn)
        btnContainer_div.append(reject_btn)

        requestContainer_div.append(avatar_div)
        requestContainer_div.append(name_p)
        requestContainer_div.append(btnContainer_div)

        const listElement_li = $('<li></li>')
        listElement_li.append(requestContainer_div)

        requestList_ul.append(listElement_li)
    }
    requests_div.append(requestList_ul)
}


function getAllRequests(id, callback) {
    $.ajax({
        url: `${SERVER_URL}/api/user/${id}/allFriendsRequest`,
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

function getAllFriends(id, callback) {
    $.ajax({
        url: `${SERVER_URL}/api/user/${id}/allFriends`,
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

function acceptFriendRequest(myId, friendId, callback) {
    $.ajax({
        url: `${SERVER_URL}/api/user/accept-request/${myId}/${friendId}`,
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
        url: `${SERVER_URL}/api/user/cancel-request/${myId}/${friendId}`,
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

function deleteFriend(myId, friendId, callback) {
    $.ajax({
        url: `${SERVER_URL}/api/user/delete-friend/${myId}/${friendId}`,
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


function init() {
    renderNavbar();

    getAllRequests(userId, (response1) => {
        if (response1.length > 0) {
            for (let i = 0; i < response1.length; i++) {
                requests[i] = response1[i];
            }
        }

        getAllFriends(userId, (response) => {
           if (response.length > 0) {
               for (let i = 0; i < response.length; i++) {
                   friends[i] = response[i];
               }
           }
            renderFriendsPage();
           console.log(requests);
           console.log(friends);
        })

    })
}

$( () => {
    init();
});