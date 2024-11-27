document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".content");

  // Handle tab switching
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      buttons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to the clicked button
      button.classList.add("active");

      // Hide all content
      contents.forEach((content) => content.classList.remove("active"));
      // Show the content corresponding to the clicked button
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");

      // Fetch data only for the active tab
      if (tabId === "tab1") {
        fetchDepartmentDetails();
      } else if (tabId === "tab2") {
        fetchDivisionDetails();
      } else if (tabId === "tab3") {
        fetchDistrictDetails();
      }
    });
  });

  // Activate the first tab by default
  buttons[0].classList.add("active");
  contents[0].classList.add("active");
  fetchDepartmentDetails(); // Fetch for the first tab initially

  // Handle Add button clicks
  const departmentButton = document.getElementById("addDepartment");
  const divisionButton = document.getElementById("addDivision");
  const districtButton = document.getElementById("addDistrict");

  departmentButton.addEventListener("click", (event) => {
    event.preventDefault(); // Stop default behavior
    const departmentInput = document.getElementById("departmentInput").value;
    const departmetnCode = document.getElementById("despartmentCode").value;
    console.log({ department: departmentInput, code: departmetnCode });
  });

  divisionButton.addEventListener("click", (event) => {
    event.preventDefault(); // Stop default behavior
    const divisionInput = document.getElementById("divisionInput").value;
    console.log({ division: divisionInput });
  });

  districtButton.addEventListener("click", (event) => {
    event.preventDefault(); // Stop default behavior
    const districtInput = document.getElementById("districtInput").value;
    console.log({ district: districtInput });
  });
});

// Fetch Department Details
async function fetchDepartmentDetails() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/department_name/all`);
    const data = await response.json();
    populateDropdown(
      data,
      "disabledSelect",
      "department_names",
      "dept_name",
      "dept_code"
    );
  } catch (error) {
    console.error("Error fetching department details:", error);
  }
}

// Fetch Division Details
async function fetchDivisionDetails() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/division/all`);
    const data = await response.json();
    populateDropdown(data, "DivisionSelect", "divisions", "div_name");
  } catch (error) {
    console.error("Error fetching division details:", error);
  }
}

// Fetch District Details
async function fetchDistrictDetails() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/district/all`);
    const data = await response.json();
    populateDropdown(data, "divisionSelect", "districts", "dist_name");
  } catch (error) {
    console.error("Error fetching district details:", error);
  }
}

// Populate Dropdown
function populateDropdown(data, dropdownId, dataKey, textKey, valueKey = null) {
    console.log(dataKey)
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.text = "Select an Option";
  dropdown.appendChild(defaultOption);

  data[dataKey].forEach((item) => {
    const option = document.createElement("option");
    if (dataKey == "department_names"){
      option.text = `${item.dept_name} | ( ${item.dept_code})`;
    } else{
        option.text = item[textKey];
    }
    if (valueKey) option.value = item[valueKey];
    dropdown.appendChild(option);
  });
}
