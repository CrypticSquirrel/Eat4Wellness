const LOGIN_URL = 'http://localhost:3000/auth/login';

$(document).ready(function () {
    $('#login').click(function (event) {
        event.preventDefault();
        login();
    });
});

/* ---------------------------------------- Handles Login --------------------------------------- */

function login() {
    window.location.href = "/client/pages/landing.html";
}
