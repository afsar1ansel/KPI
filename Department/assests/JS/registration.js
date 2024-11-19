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
      department: document.getElementById("department_names").value,
      designation: form.elements["Designation"].value,
      name: form.elements["name"].value,
      division: document.getElementById("divisions").value,
      district: document.getElementById("districts").value,
      placeOfWork: form.elements["place"].value,
      departmentCode: form.elements["departmentCode"].value,
      mobileNumber: form.elements["mobile"].value,
      password: form.elements["password"].value,
      // confirmPassword: form.elements["password-confirm"].value,
    };

    console.log(formData);

    modal.style.display = "flex";

    closeModalBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    closeOkayBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});



function populateDepartmentDropdown(departments, dropDownId, placeholder) {
  const selectDropDepartment = document.getElementById(dropDownId);

  selectDropDepartment.innerHTML = `<option>${placeholder}</option>`;

  departments.forEach((department) => {
    const option = document.createElement("option");
    option.value = department.dept_code
      ? department.dept_code
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
      const selectedDeptCode =
        selectDropDepartment.options[selectDropDepartment.selectedIndex].value;

      const departmentCodeInput = document.getElementById("departmentCode");

      departmentCodeInput.value =
        selectedDeptCode === "Choose your department" ? "" : selectedDeptCode;
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
      console.log(data);
    }
  } catch (error) {
    console.error("Error fetching department data:", error);
  }
}


