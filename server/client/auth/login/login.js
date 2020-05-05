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
		//log in function
	})

}

function init() {
	renderLogInPage();
}

$( () => {
	init();
});