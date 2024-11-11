document.addEventListener("DOMContentLoaded", function () {
  // Select all icons with the class 'bi-pencil-fill'
  const editIcons = document.querySelectorAll(".bi-pencil-fill");

  editIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      // Find the associated input element (the sibling of the icon's parent div)
      const inputField = this.previousElementSibling;

      // Toggle the 'readonly' attribute
      if (inputField.hasAttribute("readonly")) {
        inputField.removeAttribute("readonly"); // Make it editable
        inputField.focus(); // Focus on the input for convenience
        this.classList.add("editing"); // Optional: Add a class for visual feedback
      } else {
        inputField.setAttribute("readonly", true); // Make it read-only again
        this.classList.remove("editing"); // Remove the class
      }
    });
  });
});


document.addEventListener("DOMContentLoaded", function () {
  const toggleIcons = document.querySelectorAll(".toggle-password");

  toggleIcons.forEach((icon) => {
    icon.addEventListener("click", function () {
      const passwordFieldId = this.getAttribute("data-password");
      const passwordField = document.getElementById(passwordFieldId);

      // Toggle the password field's visibility
      if (passwordField.type === "password") {
        passwordField.type = "text"; // Show password
        this.style.display = "none"; // Hide the current icon
        // Show the sibling icon (eye or eye-slash) for the opposite state
        this.nextElementSibling
          ? (this.nextElementSibling.style.display = "inline")
          : (this.previousElementSibling.style.display = "inline");
      } else {
        passwordField.type = "password"; // Hide password
        this.style.display = "none"; // Hide the current icon
        // Show the sibling icon (eye or eye-slash) for the opposite state
        this.nextElementSibling
          ? (this.nextElementSibling.style.display = "inline")
          : (this.previousElementSibling.style.display = "inline");
      }
    });
  });
});
