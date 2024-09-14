// Define the API URL
//const apiUrl = 'http://localhost:8080/generate?pass_length={pass_length}';
const apiUrl = 'http://localhost:8080/generate?pass_length=20';
const passwordField = document.getElementById("password");

async function fetchPassword() {
    // Make a GET request
    return await fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        return data["generated_password"];
    })
    .catch(error => {
        alert('Error:', error);
    });

}

function displayPassword(password) {
    passwordField.innerText = password;
}

async function fetchAndDisplayPassword() {
    const password = await fetchPassword();
    displayPassword(password);
}

// We can load this function here to generate a password on page load, if we want
//fetchAndDisplayPassword();