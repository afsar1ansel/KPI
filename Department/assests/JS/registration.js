const modal = document.getElementById("modal");
// const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");
const closeOkayBtn = document.getElementById("okay");
const form = document.getElementById("fomr");

document.getElementById("login").addEventListener("click", function (event) {
  event.preventDefault();

  const fields = [
    { id: "department_names", name: "Department", type: "select" },
    { id: "Designation", name: "Designation", type: "input" },
    { id: "name", name: "Registrant’s Name", type: "input" },
    { id: "divisions", name: "Division", type: "select" },
    { id: "divisions", name: "District", type: "select" },
    { id: "place", name: "Place of work", type: "input" },
    { id: "departmentCode", name: "Departmental Code", type: "input" },
    { id: "mobile", name: "Mobile number", type: "input" },
    { id: "email", name: "Email", type: "email" },
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

    input.addEventListener("focus", () => {
      errorMessage.style.display = "none";
    });

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

  // Additional validation for email
  const emailInput = document.getElementById("email");
  const emailError = emailInput.nextElementSibling;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.style.display = "block";
    formIsValid = false;
  } else {
    emailError.style.display = "none";
  }

  // Password confirmation check
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("password-confirm").value;
  const confirmPasswordError =
    document.getElementById("password-confirm").nextElementSibling;

  if (confirmPasswordError && password !== confirmPassword) {
    // confirmPasswordError.textContent = "Passwords do not match.";
    // confirmPasswordError.style.display = "block";
    alert("Passwords do not match.");
    formIsValid = false;
  } else if (confirmPasswordError) {
    confirmPasswordError.style.display = "none";
  }

  if (formIsValid) {
    const formData1 = {
      department: document.getElementById("department_names").value,
      designation: form.elements["Designation"].value,
      name: form.elements["name"].value,
      division: document.getElementById("divisions").value,
      district: document.getElementById("districts").value,
      placeOfWork: form.elements["place"].value,
      departmentCode: form.elements["departmentCode"].value,
      email: form.elements["email"].value,
      mobileNumber: form.elements["mobile"].value,
      password: form.elements["password"].value,
      // confirmPassword: form.elements["password-confirm"].value,
    };

    console.log(formData1);

    const formData = new FormData();
    formData.append("department_name_id", formData1.department);
    formData.append("designation", formData1.designation);
    formData.append("department_user", formData1.name);
    formData.append("div_id", formData1.division);
    formData.append("dist_id", formData1.district);
    formData.append("place", formData1.placeOfWork);
    // formData.append("departmentCode", formData.departmentCode);
    formData.append("department_email", formData1.email);
    formData.append("mobile", formData1.mobileNumber);
    formData.append("department_password", formData1.password);

    console.log(Array.from(formData.entries()));

    fectchResponse(formData);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("toggle-password");
  const passwordInput = document.getElementById("password");

  const togglePasswordConfirm = document.getElementById(
    "toggle-password-confirm"
  );
  const confirmPasswordInput = document.getElementById("password-confirm");

  // Function to toggle visibility and icon
  function toggleVisibility(inputField, icon) {
    if (inputField.type === "password") {
      inputField.type = "text";
      icon.classList.remove("bi-eye-slash");
      icon.classList.add("bi-eye");
    } else {
      inputField.type = "password";
      icon.classList.remove("bi-eye");
      icon.classList.add("bi-eye-slash");
    }
  }

  // Event listeners for password toggle
  togglePassword.addEventListener("click", () => {
    toggleVisibility(passwordInput, togglePassword);
  });

  togglePasswordConfirm.addEventListener("click", () => {
    toggleVisibility(confirmPasswordInput, togglePasswordConfirm);
  });
});

function populateDepartmentDropdown(departments, dropDownId, placeholder) {
  const selectDropDepartment = document.getElementById(dropDownId);

  selectDropDepartment.innerHTML = `<option>${placeholder}</option>`;

  console.log(departments);

  departments.forEach((department) => {
    const option = document.createElement("option");
    option.value = department.dept_code
      ? department.id
      : department.div_id
      ? department.div_id
      : department.dist_id;
    option.textContent = department.dept_name
      ? department.dept_name
      : department.div_name
      ? department.div_name
      : department.dist_name;
    selectDropDepartment.appendChild(option);
  });

  if (dropDownId === "department_names") {
    selectDropDepartment.addEventListener("change", () => {
      departments.forEach((department) => {
        if (department.id == selectDropDepartment.value) {
          const departmentCodeInput = document.getElementById("departmentCode");
          departmentCodeInput.value = department.dept_code;
        }
      });
    });
  }
}

fetchDepartments(
  "http://127.0.0.1:5000/department_name/all",
  "department_names",
  "Choose your department"
);
fetchDivision();
fetchDistrict();

async function fetchDivision() {
  try {
    const response = await fetch("http://127.0.0.1:5000/division/all", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(data);

    if (data.divisions) {
      populateDepartmentDropdown(
        data.divisions,
        "divisions",
        "Choose your division"
      );
    } else {
      console.error("Unexpected response format for divisions:", data);
    }
  } catch (error) {
    console.error("Error fetching divisions:", error);
  }
}

async function fetchDistrict() {
  try {
    const response = await fetch("http://127.0.0.1:5000/district/all", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    if (data.districts) {
      populateDepartmentDropdown(
        data.districts,
        "districts",
        "Choose your district"
      );
    } else {
      console.error("Unexpected response format for districts:", data);
    }
  } catch (error) {
    console.error("Error fetching districts:", error);
  }
}

async function fetchDepartments(apiUrl, dropDownId, placeholder) {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
    });
    const data = await response.json();
    // console.log(data);

    if (data) {
      populateDepartmentDropdown(data[dropDownId], dropDownId, placeholder);
    } else {
      console.error("Unexpected response format:", data);
      // console.log(data);
    }
  } catch (error) {
    console.error("Error fetching department data:", error);
  }
}

async function fectchResponse(data) {
  // console.log(data)
  const response = await fetch(`http://127.0.0.1:5000/department/add`, {
    method: "POST",
    body: data,
  });
  const result = await response.json();
  console.log(result);

  if (result.errflag == 0) {
    const toastElement = document.getElementById("toast-error");
    const toastMessageElement = document.getElementById("toast-message");
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }
}
