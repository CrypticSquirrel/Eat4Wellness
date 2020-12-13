const SIGNUP_URL = 'http://localhost:3000/auth/signup';

$(document).ready(function () {
    $('#signup').click(function (event) {
        event.preventDefault();
        signup();
    });
});

/* --------------------------------------- Handles Signup --------------------------------------- */

function signup() {
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const username = $('#username').val();
    const email = $('#email').val();
    const address = $('#address').val();
    const city = $('#city').val();
    const country = $('#country').val();
    const state = $('#state').val();
    const zip = $('#zip').val();
    const zip = $('#password').val();

    const body = {
        firstName,
        lastName,
        username,
        email,
        address,
        city,
        country,
        state,
        zip,
        password
    };

    /**
	 * Makes a POST request to server @localhost:3000/auth/signup with signup info. 
	 * Redirects user to login page when signup is successful. Alert if error.
	 */
    fetch(SIGNUP_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-type': 'application/json',
        },
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
        return response.json().then((error) => {
            throw new Error(error.message);
        });
    }).then((result) => {
        window.location.href = '../index.html';
    }).catch((error) => {
        this.errorMessage = error.message;
        console.log(`error: ${error}`);
        alert(error.message);
    });
}
