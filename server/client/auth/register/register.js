window.onload = init;

function init() {
    setRegisterEvents();
}

function setRegisterEvents() {
    $('.register-btn').on('click', function () {
        const fullName = $('#fullName').val();
        const username = $('#username').val();
        const password = $('#password').val();
        const email = $('#email').val();
        const gender = $('#gender').val();

        const user = {
            fullName: fullName,
            username: username,
            password: password,
            email: email,
            gender: gender
        };

        if (validForm(user) != false) {
            sendCreateRequest(user);
        } 
    })
}

function sendCreateRequest(user) {
    $.ajax({
        url: 'http://localhost:3000/api/user/',
        type: 'POST',
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",
        success: function (result) {
            console.log(result);
            alert("Successfully created new user. You can log in now !");
            window.location = '/login';
        },
        error: function (error) {
            console.log(error);
            alert("Username or Email is already taken !!!");
        }
    });
}

function validForm(user) {
    if (user.fullName.length >= 4) {
        if (user.username.length >= 4) {
            if (user.password.length >= 4) {
                if (user.email.includes('@') && user.email.includes('.')) {
                    return true;
                } else {
                    alert('Please insert a valid email address !');
                    return false;
                }
            } else {
                alert('Password must contain at least 4 characters');
                return false;
            }
        } else {
            alert('Username must contain at least 4 characters');
            return false;
        }
    } else {
        alert('Full Name must contain at least 4 characters');
        return false;
    }
}