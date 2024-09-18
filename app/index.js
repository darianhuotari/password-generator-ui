// Define the API URL
const apiBaseUrl = 'http://localhost:8080/generate?';

// Define the password field as a variable, coming from the input in the form
const passwordField = document.getElementById("formPassword");

// Define the form so we can take over the submission event
const form = document.querySelector("#pwdForm")

// Fetch password function
async function fetchPassword() {
    
    // Pull pwdLength from form
    let pwdLength = document.getElementById("pwdLength").value;

    // Create a valid URL to fetch
    let apiFullUrl = `${apiBaseUrl}pass_length=${pwdLength}`

    // Make a GET request; return errors to the user
    try {
        const response = await fetch(apiFullUrl);

        // If the OK property returns false, throw an error
        if (!response.ok) {
          const text = await response.text();
          throw Error(text);
        }
        
        // Build and return a successful response from the API
        const jsonResponse = await response.json();
        return jsonResponse["generated_password"]
          
        // Caught errors print to the log and are returned to the user
      } catch (error) {
        console.log(error);
        return (error.message) // would be nice to use something like this: ["detail"]) - we should also style this differently
      }
}

function displayPassword(password) {
    passwordField.innerText = password;
}

async function fetchAndDisplayPassword() {
    const password = await fetchPassword();
    displayPassword(password);
}


// Take over form submission; see https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_forms_through_JavaScript#associating_a_formdata_object_and_a_form
form.addEventListener("submit", (event) => {
    event.preventDefault();
    fetchAndDisplayPassword();
});

// We can load this function here to generate a password on page load, if we want
//fetchAndDisplayPassword();