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
      } else if (tabId === "tab4") {
        fetchUnitDetails();
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
  const addUnit = document.getElementById("addUnit");

  departmentButton.addEventListener("click", (event) => {
    event.preventDefault(); // Stop default behavior
    const departmentInput = document.getElementById("departmentInput").value;
    const departmetnCode = document.getElementById("despartmentCode").value;
    // console.log({ department: departmentInput, code: departmetnCode });

    if (departmentInput == "" || departmetnCode == "") {
      alert("Please enter a valid department name and code");
      return;
    }

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

    if (divisionInput == "") {
      alert("Please enter a valid division name");
      return;
    }

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

    if (districtInput == "") {
      alert("Please enter a valid district name");
      return;
    }

    const formData = new FormData();
    formData.append("dist_name", districtInput);
    formData.append("token", tok);

    console.log(Object.fromEntries(formData));

    handleAddClick(
      "https://staging.thirdeyegfx.in/kpi_app/district_master/add",
      formData
    );
  });

  addUnit.addEventListener("click", (event) => {
    event.preventDefault(); // Stop default behavior
    const unitInput = document.getElementById("unitInput").value;
    // console.log({ unit: unitInput });

    if (unitInput == "") {
      alert("Please enter a valid unit name");
      return;
    }

    const formData = new FormData();
    formData.append("uom", unitInput);
    formData.append("token", tok);

    console.log(Object.fromEntries(formData));

    handleAddClick(
      "https://staging.thirdeyegfx.in/kpi_app/uom_master/add",
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
    // console.log(data)
    if(data){
      populateDropdown(data, "districtSelect", "districts", "dist_name");
    }
  } catch (error) {
    console.error("Error fetching district details:", error);
  }
}

async function fetchUnitDetails(){
  try {
    const response = await fetch(
      `https://staging.thirdeyegfx.in/kpi_app/get_all_uom/all/${tok}`
    );
    const data = await response.json();
    // console.log(data)
    if(data){
      populateDropdown(data, "unitSelect", "uom", "uom");
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


  showToast("Data added successfully!", "danger");

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
    if (res.errflag == 0) {
      showToast("Data added successfully!", "success");
    }else{
      showToast("something went wrong!", "danger");
    }
  } catch (error) {
    console.error("Error adding data:", error);
  }
}



function showToast(message, type) {
  const toastContainer = document.getElementById("toastContainer");
  const toastElement = document.getElementById("toast");

  const toastBody = toastElement.querySelector(".toast-body");
  const closeButton = toastElement.querySelector(".btn-close");

  toastBody.textContent = message;

  let toastClass = "text-bg-success";
  if (type === "danger") toastClass = "text-bg-danger"; 
  toastElement.className = `toast align-items-center ${toastClass} border-0`;

  const toast = new bootstrap.Toast(toastElement, { autohide: false });
  toast.show();

  const autoHideTimeout = setTimeout(() => {
    toast.hide();
  }, 3000);

  closeButton.onclick = () => {
    clearTimeout(autoHideTimeout); 
    toast.hide();
  };

  toastElement.addEventListener("hidden.bs.toast", () => {
    toastElement.className = `toast align-items-center ${toastClass} border-0`;
  });
}

