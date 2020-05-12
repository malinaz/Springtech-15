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
    const logOut = $('<a></a>').addClass('list-item').text('Log Out');
    const logIn = $('<a></a>')
        .addClass('list-item')
        .text('Log In')
        .attr('href', '/login');
    const dropdownBtn = $('<div></div>').addClass('dropdown-btn');
    const dropdownIcon = $('<i></i>').addClass('fas fa-bars');

    logo.append(logoIcon);
    dropdownBtn.append(dropdownIcon);
    navList.append(newsFeed, profile, logOut, logIn);
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


