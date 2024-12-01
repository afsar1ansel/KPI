const tok = localStorage.getItem("authToken");
document.addEventListener("DOMContentLoaded", async () => {
  await Promise.all([
    fetchDepartmentDetails(),
    fetchDivisionDetails(),
    fetchDistrictDetails(),
  ]);
  buttons[0].classList.add("active");
  contents[0].classList.add("active");
});
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-button");
  const contents = document.querySelectorAll(".content");

  // Handle tab switching
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Hide all content
      contents.forEach((content) => content.classList.remove("active"));
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");

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
    // console.log({ department: departmentInput, code: departmetnCode });

    const formData = new FormData();
    formData.append("dept_name", departmentInput);
    formData.append("dept_code", departmetnCode);
    formData.append("token", tok);

    // console.log(Object.fromEntries(formData));

    handleAddClick(
      "https://staging.thirdeyegfx.in/kpi_app/dept_masters/add",
      formData
    );
  });

  divisionButton.addEventListener("click", (event) => {
    event.preventDefault();
    const divisionInput = document.getElementById("divisionInput").value;
    // console.log({ division: divisionInput });

    const formData = new FormData();
    formData.append("div_name", divisionInput);
    formData.append("token", tok);

    console.log(Object.fromEntries(formData));

    handleAddClick(
      "https://staging.thirdeyegfx.in/kpi_app/division_master/add",
      formData
    );
  });

  districtButton.addEventListener("click", (event) => {
    event.preventDefault(); // Stop default behavior
    const districtInput = document.getElementById("districtInput").value;
    // console.log({ district: districtInput });

    const formData = new FormData();
    formData.append("dist_name", districtInput);
    formData.append("token", tok);

    console.log(Object.fromEntries(formData));

    handleAddClick(
      "https://staging.thirdeyegfx.in/kpi_app/district_master/add",
      formData
    );
  });
});

// Fetch Department Details
async function fetchDepartmentDetails() {
  try {
    const response = await fetch(
      `https://staging.thirdeyegfx.in/kpi_app/department_name/all`
    );
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
    const response = await fetch(
      `https://staging.thirdeyegfx.in/kpi_app/division/all`
    );
    const data = await response.json();
    if(data){
      populateDropdown(data, "DivisionsSelect", "divisions", "div_name");
    }
  } catch (error) {
    console.error("Error fetching division details:", error);
  }
}

// Fetch District Details
async function fetchDistrictDetails() {
  try {
    const response = await fetch(
      `https://staging.thirdeyegfx.in/kpi_app/district/all`
    );
    const data = await response.json();
    if(data){
      populateDropdown(data, "districtSelect", "districts", "dist_name");
    }
  } catch (error) {
    console.error("Error fetching district details:", error);
  }
}

// Populate Dropdown
function populateDropdown(data, dropdownId, dataKey, textKey, valueKey = null) {
  // console.log(dataKey);
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.text = "Select an Option";
  dropdown.appendChild(defaultOption);

  data[dataKey].forEach((item) => {
    const option = document.createElement("option");
    if (dataKey == "department_names") {
      option.text = `${item.dept_name} | ( ${item.dept_code})`;
    } else {
      option.text = item[textKey];
    }
    if (valueKey) option.value = item[valueKey];
    dropdown.appendChild(option);
  });
}

async function handleAddClick(url, data) {
  // console.log(event);
  console.log(Object.fromEntries(data));
  try {
    // const payload = typeof data === "string" ? data : JSON.stringify(data);

    const response = await fetch(
      `${url}`,
      {
        method: "POST",
        body: data,
      }
    );

    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error adding data:", error);
  }
}
