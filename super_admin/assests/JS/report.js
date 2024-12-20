const tok = localStorage.getItem("authToken");
function populateYears(selectElement, startYear, endYear) {
  selectElement.innerHTML = ""; // Clear existing options
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.text = startYear ? "Select End Year" : "Select Start Year";
  selectElement.appendChild(defaultOption);

  for (let year = startYear; year <= endYear; year++) {
    const option = document.createElement("option");
    option.value = year;
    option.text = year;
    selectElement.appendChild(option);
  }
}

const startYearDropdown = document.getElementById("dateStart");
const endYearDropdown = document.getElementById("dateEnd");

const currentYear = new Date().getFullYear();
const startYearRange = 2000;
const endYearRange = currentYear;
populateYears(startYearDropdown, startYearRange, endYearRange);

startYearDropdown.addEventListener("change", function () {
  const selectedStartYear = parseInt(startYearDropdown.value, 10);
  if (selectedStartYear) {
    populateYears(endYearDropdown, selectedStartYear, endYearRange);
  } else {
    endYearDropdown.innerHTML = ""; 
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.text = "Select End Year";
    endYearDropdown.appendChild(defaultOption);
  }
});

document.getElementById("applyButton").addEventListener("click", function () {
  const department = document.getElementById("Select").value;
  const startYear = startYearDropdown.value;
  const endYear = endYearDropdown.value;

  filterData(department, startYear, endYear);
});

async function filterData(department, startYear, endYear) {
  // console.log("Filtering data with:", { department, startYear, endYear });

  const form = new FormData();
  form.append("dept_id", department);
  form.append("min_year", startYear);
  form.append("max_year", endYear);
  form.append("token", tok);

  console.log(Object.fromEntries(form));

  try {
    const response = await fetch(
      `https://staging.thirdeyegfx.in/kpi_app/get_dept_report`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error filtering data:", error);
  }
}

// chart js

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Baseline Target", "Current Status", "5 Year Goal"],
      datasets: [
        {
          label: "KPI",
          data: [18, 13, 3],
          borderWidth: 1,
          backgroundColor: [
            "rgba(255, 213, 153, 1)",
            "rgba(95, 167, 119, 1)",
            "rgba(15, 102, 9, 1)",
          ],
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // const ctx1 = document.getElementById("myChart1");
  // new Chart(ctx1, {
  //   type: "bar",
  //   data: {
  //     labels: ["Baseline Target", "Current Status", "5 Year Goal"],
  //     datasets: [
  //       {
  //         label: "KPI",
  //         data: [12, 19, 3],
  //         borderWidth: 1,
  //         backgroundColor: [
  //           "rgba(255, 213, 153, 1)",
  //           "rgba(95, 167, 119, 1)",
  //           "rgba(15, 102, 9, 1)",
  //         ],
  //       },
  //     ],
  //   },
  //   options: {
  //     plugins: {
  //       legend: {
  //         display: false,
  //       },
  //     },
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  // });

  //  const ctx2 = document.getElementById("myChart2");
  //  new Chart(ctx2, {
  //    type: "bar",
  //    data: {
  //      labels: ["Baseline Target", "Current Status", "5 Year Goal"],
  //      datasets: [
  //        {
  //          label: "KPI",
  //          data: [1200, 190, 300],
  //          borderWidth: 1,
  //          backgroundColor: [
  //            "rgba(255, 213, 153, 1)",
  //            "rgba(95, 167, 119, 1)",
  //            "rgba(15, 102, 9, 1)",
  //          ],
  //        },
  //      ],
  //    },
  //    options: {
  //      plugins: {
  //        legend: {
  //          display: false,
  //        },
  //      },
  //      scales: {
  //        y: {
  //          beginAtZero: true,
  //        },
  //      },
  //    },
  //  });
});

fetchDepartmentDetails();

async function fetchDepartmentDetails() {
  try {
    const response = await fetch(
      `https://staging.thirdeyegfx.in/kpi_app/department_name/all`
    );
    const data = await response.json();

    // console.log(data);

    setDropDown(data.department_names);
  } catch (error) {
    console.error("Error fetching department details:", error);
  }
}

function setDropDown(data) {
  // console.log(data)

  const select = document.getElementById("Select");
  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.text = "Select an Option";
  select.appendChild(defaultOption);

  data.forEach((item) => {
    const option = document.createElement("option");
    option.text = item.dept_name;
    option.value = item.id;
    select.appendChild(option);
  });
}
