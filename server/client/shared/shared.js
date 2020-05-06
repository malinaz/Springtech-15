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
}