async function fetchdetails() {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/division/all`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log(data);
    populateDropdown(data);
  } catch (error) {
    console.error("Error fetching department status:", error);
    return null;
  }
}

fetchdetails();

function populateDropdown(data) {
  // console.log(data.department_names);
  const dropdown = document.getElementById("disabledSelect");

  dropdown.innerHTML = "hii";

  const defaultOption = document.createElement("option");
  defaultOption.text = "List Of Departments";
  // defaultOption.disabled = true;
  // defaultOption.selected = true;
  dropdown.appendChild(defaultOption);

  data.divisions.forEach((department) => {
    const option = document.createElement("option");
    option.value = department.dept_code;
    option.text = `${department.div_name}`;
    dropdown.appendChild(option);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField1 = document.querySelector("#disabledTextInput");
//   const inputField2 = document.querySelector("#disabledTextInput1");
  const addButton = document.querySelector("button");

  addButton.addEventListener("click", (event) => {
    event.preventDefault();

    const value1 = inputField1.value.trim();
    // const value2 = inputField2.value.trim();

    const formData = new FormData();
    formData.append("department_name_id", value1);
    // formData.append("designation", value2);
    // formData.append("token", tok)
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
  });
});
