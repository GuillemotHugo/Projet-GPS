function checkCookie(cookieName) {
    var cookies = document.cookie.split(';');
    console.log('Regarde la présence du cookie');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) == 0) {
            return true;
        }
    }
    return false;
}

function displayButtons() {
    var cookieExists = checkCookie('ProviHub-Token');

    var divLogin = document.getElementById('Login');
    var divRegister = document.getElementById('Register');
    var divLogout = document.getElementById('Logout');
    var divAddProject = document.getElementById('addprojet');
    var divUsernameConnected = document.getElementById('UsernameConnected');

    if (cookieExists) {
        divLogin.style.display = 'none';
        divRegister.style.display = 'none';
        divLogout.style.display = 'block';
        divUsernameConnected.style.display = 'none';

        console.log('Cookie existe');
    } else {
        divLogin.style.display = 'block';
        divRegister.style.display = 'block';
        divLogout.style.display = 'none';
        divUsernameConnected.style.display = 'none';
        console.log('Cookie existe pas');
    }
}
