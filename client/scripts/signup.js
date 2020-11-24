const SIGNUP_URL = 'http://localhost:3000/auth/signup';

$(document).ready(function () {
    $('#signup').click(function (event) {
        event.preventDefault();
        signup();
    });
});

/* --------------------------------------- Handles Signup --------------------------------------- */

function signup() {
    const username = $('#uname').val();
    const password = $('#pwd').val();
    const confirmpwd = $('#cpwd').val();

    const body = {
        username,
        password,
        repeat_password: confirmpwd,
    };

    /**
	 * Makes a POST request to server @localhost:3000/auth/signup with signup info. 
	 * Redirects user to login page when signup is successful. Alert if error.
     * 
     * TODO: Modify code to redirect to home page when created. Commented out right now.
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
        // window.location.href = '../index.html';
        console.log(`token: ${result.token}`);
        localStorage.token = result.token;
    }).catch((error) => {
        this.errorMessage = error.message;
        console.log(`error: ${error}`);
        alert(error.message);
    });
}
