const modal = document.getElementById("modal");
// const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const form = document.getElementById("fomr");

document.getElementById("login").addEventListener("click", function (event) {
  event.preventDefault();

  const fields = [
    { id: "selectDropDepartment", name: "Department", type: "select" },
    { id: "Designation", name: "Designation", type: "input" },
    { id: "name", name: "Registrant’s Name", type: "input" },
    { id: "selectDropDivision", name: "Division", type: "select" },
    { id: "selectDropDistrict", name: "District", type: "select" },
    { id: "place", name: "Place of work", type: "input" },
    { id: "departmentCode", name: "Departmental Code", type: "input" },
    { id: "mobile", name: "Mobile number", type: "input" },
    { id: "password", name: "Password", type: "input" },
    { id: "password-confirm", name: "Confirm Password", type: "input" },
  ];

  let formIsValid = true;

  fields.forEach((field) => {
    const input = document.getElementById(field.id);
    const errorMessage = input.nextElementSibling;

    if (!errorMessage || !errorMessage.classList.contains("error-message")) {
      console.warn(`No error message element found for ${field.name}`);
      return;
    }

    if (
      (field.type === "input" && input.value.trim() === "") ||
      (field.type === "select" && input.value === "Choose your department") ||
      input.value === "Choose your division" ||
      input.value === "Choose your district"
    ) {
      errorMessage.textContent = `${field.name} is required.`;
      errorMessage.style.display = "block";
      formIsValid = false;
    } else {
      errorMessage.style.display = "none";
    }
  });

  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("password-confirm").value;
  const confirmPasswordError =
    document.getElementById("password-confirm").nextElementSibling;

  if (confirmPasswordError && password !== confirmPassword) {
    confirmPasswordError.textContent = "Passwords do not match.";
    confirmPasswordError.style.display = "block";
    formIsValid = false;
  } else if (confirmPasswordError) {
    confirmPasswordError.style.display = "none";
  }

  if (formIsValid) {
    const formData = {
      department: document.getElementById("selectDropDepartment").value,
      designation: form.elements["Designation"].value,
      name: form.elements["name"].value,
      division: document.getElementById("selectDropDivision").value,
      district: document.getElementById("selectDropDistrict").value,
      placeOfWork: form.elements["place"].value,
      departmentCode: form.elements["departmentCode"].value,
      mobileNumber: form.elements["mobile"].value,
      password: form.elements["password"].value,
      confirmPassword: form.elements["password-confirm"].value,
    };

    console.log(formData);

    //Model
      modal.style.display = "flex";

    // Function to close the modal
    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});


// document.getElementById("login").addEventListener("click", function (event){
//   event.preventDefault();
//    //Model
//       modal.style.display = "flex";

//     // Function to close the modal
//     closeModalBtn.addEventListener("click", () => {
//       modal.style.display = "none";
//     });

//     // Close modal when clicking outside the modal content
//     window.addEventListener("click", (event) => {
//       if (event.target === modal) {
//         modal.style.display = "none";
//       }
//     });
// })

