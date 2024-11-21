let body = document.querySelector("body");
let right = document.createElement("div");
right.setAttribute("class", "right");
let left = document.createElement("div");
left.setAttribute("class", "left");
 const email = document.getElementById("email");
 const password = document.getElementById("password");
 const loginBtn = document.querySelector(".login-btn");


const loginForm = document.getElementById("login-form");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("toggle-password");

const inputValidationMsg = document.createElement("div"); 

// Append validation message div to the login box
const loginBox = document.querySelector(".formBox");
loginBox.appendChild(inputValidationMsg);
inputValidationMsg.classList.add("validation-message");
inputValidationMsg.style.display = "none";

togglePassword.addEventListener("click", () => {
  const isPasswordHidden = passwordInput.type === "password";
  passwordInput.type = isPasswordHidden ? "text" : "password";
   passwordInput.style.paddingLeft = "10px";
     passwordInput.style.width = "100%";  
  //  passwordInput.style.paddingRight = "30px";
  passwordInput.style.width = "100%";
  togglePassword.src = isPasswordHidden
    ? "./assests/img/Icon2.svg"
    : "./assests/img/Icon.svg"; 
});


  const emailRegex =
    /^(?!.*[<>\\/\[\]{};:])(?!.*(script|alert|confirm|prompt|document|window|eval|onload|onerror|innerHTML|setTimeout|setInterval|XMLHttpRequest|fetch|Function|console))[^\s@]+@[^\s@]+\.[^\s@]+$/;


const validateInputs = () => {
  let valid = true;
  let validationMsg = "";

  // Validate email input
  if (!email.value.trim()) {
    validationMsg += "Email cannot be empty.\n";
    email.style.borderColor = "red";
    valid = false;
  } else if (!email.value.trim().match(emailRegex)) {
    validationMsg += "Please enter a valid email address.\n";
    email.style.borderColor = "red";
    valid = false;
  } else {
    email.style.borderColor = "";
  }

  // Validate password input
  if (!passwordInput.value.trim()) {
    validationMsg += "Password cannot be empty.\n";
    passwordInput.style.borderColor = "red";
    valid = false;
  } else {
    passwordInput.style.borderColor = "";
  }

  // Show validation messages if any
  if (validationMsg) {
    inputValidationMsg.innerText = validationMsg;
    inputValidationMsg.style.display = "block";
  } else {
    inputValidationMsg.style.display = "none";
  }

  return valid;
};
  


const focusOnFirstError = () => {
  if (email.style.borderColor === "red") {
    email.focus();
  } else if (password.style.borderColor === "red") {
    password.focus();
  }
};

  
 async function handleSubmit(event) {
    event.preventDefault();
   
    if (!validateInputs()) {
      focusOnFirstError();
      return;
    }
    
    // console.log("Email:", email.value);
    // console.log("Password:", password.value);

    try {
      // Show loading state on the login button
      loginBtn.disabled = true;
      loginBtn.innerHTML = `<div class="spinner-border spinner-border-sm" role="status">
                            <span class="visually-hidden">Loading...</span>
                          </div>`;

      // Prepare form data
      const formData = new FormData();
      formData.append("email", email.value.trim());
      formData.append("password", passwordInput.value.trim());

      // Send a POST request to the login API
      const response = await fetch("http://127.0.0.1:5000/superadmin/login", {
        method: "POST",
        body: formData,
        // mode: "no-cors",
      });

      // Parse the JSON response
      console.log(email, passwordInput)
      const data = await response.json();
      console.log(data)
      if (data.errflag == undefined) {
        // Successful login, save token and redirect to the dashboard
        localStorage.setItem("authToken", data.userToken);
        localStorage.setItem("userEmail", email.value.trim());
        window.location.href = "homePage.html";
      } else if (data.errflag === 3) {
        // Input validation error on the server side
        inputValidationMsg.textContent = data.message + " Enter a safe input.";
        inputValidationMsg.style.display = "block";
        email.focus();
      } else {
        // General login failure (e.g., wrong password)
        inputValidationMsg.textContent = data.message + " Please try again.";
        inputValidationMsg.style.display = "block";
        email.focus();
      }
    } catch (error) {
      // Handle network or unexpected errors
      console.error("Error:", error);
      inputValidationMsg.textContent = "An error occurred, please try again.";
      inputValidationMsg.style.display = "block";
    } finally {
      // Re-enable the login button and restore its text
      loginBtn.disabled = false;
      loginBtn.innerHTML = "Login";
    }
  }


  loginForm.addEventListener("submit", handleSubmit);