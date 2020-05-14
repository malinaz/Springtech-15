const SERVER_URL = 'http://localhost:3000';

function renderLogInPage() {
	const container_div = $("#container");
	container_div.empty();

	const logInContainer_div = $("<div class='login-container'></div>");
	const logInTitle_p = $("<h3>LOG IN</h3>");
	const logInUsername_input = $("<input type='text' placeholder='Username'>");
	const logInPassword_input = $("<input type='password' placeholder='Password'>");
	const logIn_button = $("<button>Log In</button>");
	const login_toRegister_a = $("<p>Don't have an account? <a href='/register'>Register Here</a> </p>");

	container_div.append(logInContainer_div);
	logInContainer_div.append(logInTitle_p);
	logInContainer_div.append(logInUsername_input);
	logInContainer_div.append(logInPassword_input);
	logInContainer_div.append(logIn_button);
	logInContainer_div.append(login_toRegister_a);

	logIn_button.click( () => {
		const username = logInUsername_input.val();
		const password = logInPassword_input.val();

		if(username === '' || password === '') {
			//alert('All fields must be completed!');
			toastr['error']('All fields must be completed!', 'Login Failure', toastrOptions);
			return;
		}

		tryLogIn(username, password, (user) => {
			if(user) {
				localStorage.setItem('userId', user._id);
				window.location.href='/feed';
			} else {
				//alert('Invalid username or password !')
				toastr['error']('Invalid username or password!', 'Login Failure', toastrOptions);
			}
		})
	})

}

function tryLogIn(username, password, callback) {
	$.ajax({
		url: `${SERVER_URL}/api/user/${username}/${password}`,
		type: 'GET',
		dataType: 'json',
		contentType: "application/json; charset=utf-8",
		success: function (response) {
			callback(response);
		},
		error: function (error) {
			//console.log(error);
			toastr['error']('A connection error has occured!', 'Connection Failure', toastrOptions);
		}
	});
}

function init() {
	renderLogInPage();
}

$( () => {
	init();
});