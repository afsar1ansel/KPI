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
  const dropdown = document.getElementById(dropdownId);
  dropdown.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.text = "Select an Option";
  defaultOption.value = "";
  dropdown.appendChild(defaultOption);

  data[dataKey].forEach((item) => {
    const option = document.createElement("option");
    
    if (dataKey == "department_names") {
      option.text = `${item.dept_name} | ( ${item.dept_code})`;
      option.value = item.id;
    } else {
      // console.log(item)
      if (item.dist_id) {
        option.text = item[textKey];
        option.value = item.dist_id;
      }else if (item.div_id) {
        option.text = item[textKey];
        option.value = item.div_id;
      }else if (item.uom) {
        option.text = item[textKey];
        option.value = item.uom;
      }
    }
    dropdown.appendChild(option);
  });
}


  

async function handleAddClick(url, data) {
 

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
    console.log(res)
    if (res.errflag == 0) {
      showToast("Data added successfully!", "success");
      alert("Data added successfully!");
    }else{
      showToast("something went wrong!", "danger");
    }
  } catch (error) {
    console.error("Error adding data:", error);
  }
}


      // showToast("something about trying" , "success")

function showToast(message, type) {
  console.log("here");

  // Get the toast container and the template toast
  const toastContainer = document.getElementById("toastContainer");
  const toastTemplate = document.getElementById("toast");

  // Clone the template for a new toast
  const toastElement = toastTemplate.cloneNode(true);
  toastElement.style.display = "block"; // Ensure the toast is visible
  toastElement.id = ""; // Clear the ID to avoid duplicates

  // Update the message in the cloned toast
  const toastBody = toastElement.querySelector(".toast-body");
  toastBody.textContent = message;

  // Update the toast's class based on the type
  let toastClass = "text-bg-primary"; // Default
  if (type === "success") toastClass = "text-bg-success";
  if (type === "danger") toastClass = "text-bg-danger";
  toastElement.classList.replace("text-bg-primary", toastClass);

  // Append the new toast to the container
  toastContainer.appendChild(toastElement);

  // Initialize and show the toast
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 3000,
  });
  toast.show();

  // Add event listener to remove the toast from DOM after hiding
  toastElement.addEventListener("hidden.bs.toast", () => {
    toastElement.remove();
  });
}



// delete

const dropdown = document.getElementById("disabledSelect");
const dropdown1 = document.getElementById("districtSelect");
const dropdown2 = document.getElementById("DivisionsSelect");
const dropdown3 = document.getElementById("unitSelect");
const deleteBox = document.querySelector(".DeleteBox");

const deleteDepartment = document.getElementById("deleteDistrictBox");

const deleteDivision = document.getElementById("deleteDivisionBox");
const deleteUnit = document.getElementById("deleteUnitBox");



  dropdown.addEventListener("change", function () {
    // console.log(dropdown);
    if (dropdown.value) {
      // Show the DeleteBox div by changing its display style to flex
      deleteBox.style.display = "flex";
    } else {
      // Hide the DeleteBox div if no option is selected
      deleteBox.style.display = "none";
    }
  });

  dropdown1.addEventListener("change", function () {
    console.log(dropdown1);
    if (dropdown1.value) {
      // Show the DeleteBox div by changing its display style to flex
      deleteDepartment.style.display = "flex";
    } else {
      // Hide the deleteDepartment div if no option is selected
      deleteDepartment.style.display = "none";
    }
  });

  dropdown2.addEventListener("change", function () {
    console.log(dropdown2);
    if (dropdown2.value) {
      // Show the DeleteBox div by changing its display style to flex
      deleteDivision.style.display = "flex";
    } else {
      // Hide the deleteDivision div if no option is selected
      deleteDivision.style.display = "none";
    }
  });

  dropdown3.addEventListener("change", function () {
    console.log(dropdown3);
    if (dropdown3.value) {
      // Show the DeleteBox div by changing its display style to flex
      deleteUnit.style.display = "flex";
    } else {
      // Hide the deleteUnit div if no option is selected
      deleteUnit.style.display = "none";
    }
  });

document
  .getElementById("deleteDepartment")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // Get the selected option from the dropdown
    const dropdown = document.getElementById("disabledSelect");
    // console.log(dropdown)
    const selectedValue = dropdown.value; // Get the value of the selected option


    deleteMaster(
      "https://staging.thirdeyegfx.in/kpi_app/dept_masters/delete",
      "dept_id",
      selectedValue
    );
  });

  document
  .getElementById("deleteDistrict")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // Get the selected option from the dropdown
    const dropdown = document.getElementById("districtSelect");
    const selectedValue = dropdown.value; // Get the value of the selected option
    const selectedText = dropdown.options[dropdown.selectedIndex].text; // Get the text of the selected option

    deleteMaster(
      "https://staging.thirdeyegfx.in/kpi_app/district_master/delete",
      "dist_id",
      selectedValue
    );

  })

  document
  .getElementById("deleteDivision")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // Get the selected option from the dropdown
    const dropdown = document.getElementById("DivisionsSelect");
    const selectedValue = dropdown.value; // Get the value of the selected option
 

      deleteMaster(
        "https://staging.thirdeyegfx.in/kpi_app/division_master/delete",
        "div_id",
        selectedValue
      );
  })

  document
  .getElementById("deleteUnit")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // Get the selected option from the dropdown
    const dropdown = document.getElementById("unitSelect");
    const selectedValue = dropdown.value; // Get the value of the selected option


     deleteMaster(
       "https://staging.thirdeyegfx.in/kpi_app/uom_master/delete",
       "uom_id",
       selectedValue
     );
  })


async function deleteMaster(url, field, id) {
  const formData = new FormData();
  formData.append(field, id);
  formData.append("token", tok);
  // console.log(Object.fromEntries(formData));
  // console.log(url, field , id)

  try {
    const res = await fetch(`${url}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    // console.log(data.errflag);

    if (data.errflag == 0) {
      showToast("Item deleted successfully!", "success");
      console.log("Delete successful:", data);
      window.location.reload();
      return data;
    } else {
      showToast("Failed to delete item!", "danger");
      console.error("Error response:", data.message || "Unknown error");
    }
  } catch (error) {
    showToast("An error occurred while deleting the item.", "danger");
    console.error("Fetch error:", error);
  }
}
