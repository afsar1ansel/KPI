const tok = localStorage.getItem("authToken");
let gridApi;
let expandedRows = {};
let department;

const gridOptions = {
  rowData: [],

  columnDefs: [
    {
      field: "kpis",
      headerName: "KPI NAME",
      // rowDrag: true,
      maxWidth: 190,
      cellRenderer: function (params) {
        console.log(params.data);
        const dataHead = params.data.kpis;
        const date = params.data.date;

        return `<div><p>${dataHead}</p><p id="trackerDate">LAST UPDATED: ${date}</p></div>`;
      },
    },
    {
      field: "baselineStatus",
      headerName: "BASELINE STATUS",
      maxWidth: 120,
      cellRenderer: function (params) {
        const dataHead = params.data.baseline_Status;
        return `<div><p>${dataHead}</p></div>`;
      },
    },
    {
      field: "target_set",
      headerName: "TARGET SET for 5 YEARS",
      maxWidth: 120,
    },
    {
      field: "department_name",
      headerName: "COORDINATING DEPARTMENT",
      maxWidth: 130,
      cellRenderer: function (params) {
        return `<div><p>${department}</p></div>`;
      },
    },
    {
      field: "strategies",
      headerName: "STRATEGIES",
      maxWidth: 200,
      cellRenderer: function (params) {
        const st = params.data.strategies || "No Strategies Yet";
        return `<div><p>${st}</p></div>`;
      },
    },
    {
      headerName: "ANNUAL TARGET",
      headerClass: "annual-target-header",
      children: [
        {
          field: "annual_target.yr1",
          headerName: "YR1",
          maxWidth: 80,
          cellRenderer: function (params) {
            const yr1 = params.data.t1 || 0;
            return `<div><p>${yr1}</p></div>`;
          },
        },
        {
          field: "annual_target.yr2",
          headerName: "YR2",
          maxWidth: 80,
          cellRenderer: function (params) {
            const yr = params.data.t2 || 0;
            return `<div><p>${yr}</p></div>`;
          },
        },
        {
          field: "annual_target.yr3",
          headerName: "YR3",
          maxWidth: 80,
          cellRenderer: function (params) {
            const yr = params.data.t3 || 0;
            return `<div><p>${yr}</p></div>`;
          },
        },
        {
          field: "annual_target.yr4",
          headerName: "YR4",
          maxWidth: 80,
          cellRenderer: function (params) {
            const yr = params.data.t4 || 0;
            return `<div><p>${yr}</p></div>`;
          },
        },
        {
          field: "annual_target.yr5",
          headerName: "YR5",
          maxWidth: 80,
          cellRenderer: function (params) {
            const yr = params.data.t5 || 0;
            return `<div><p>${yr}</p></div>`;
          },
        },
      ],
    },
    {
      headerName: "TARGET ACHIEVED",
      headerClass: "annual-target-header",
      children: [
        {
          field: "t1",
          headerName: "YR1",
          maxWidth: 80,
          cellRenderer: function (params) {
            return `<div><p>${params.data.y1}</p></div>`;
          },
        },
        {
          field: "target_achieved.yr2",
          headerName: "YR2",
          maxWidth: 80,
          cellRenderer: function (params) {
            return `<div><p>${params.data.y2}</p></div>`;
          },
        },
        {
          field: "target_achieved.yr3",
          headerName: "YR3",
          maxWidth: 80,
          cellRenderer: function (params) {
            return `<div><p>${params.data.y3}</p></div>`;
          },
        },
        {
          field: "target_achieved.yr4",
          headerName: "YR4",
          maxWidth: 80,
          cellRenderer: function (params) {
            return `<div><p>${params.data.y4}</p></div>`;
          },
        },
        {
          field: "target_achieved.yr5",
          headerName: "YR5",
          maxWidth: 80,
          cellRenderer: function (params) {
            return `<div><p>${params.data.y5}</p></div>`;
          },
        },
      ],
    },
    {
      field: "id",
      headerName: "ACTION",
      cellRenderer: function (params) {
        const dataId = JSON.stringify(params.data).replace(/"/g, "&quot;");
        // console.log(dataId);
        // const isExpanded = expandedRows[dataId];
        return `
          <button class="btn btn-success rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="actionButton(${dataId})">Update</button>
        `;
      },
    },
  ],
  defaultColDef: {
    sortable: true,
    // filter: "agTextColumnFilter",
    resizable: false,
    // flex: 1,
    filterParams: {
      debounceMs: 0,
      buttons: ["reset"],
    },
  },
  domLayout: "autoHeight",
  getRowHeight: function (params) {
    return params.node.detail ? 150 : 200;
  },

  pagination: false,
  // paginationPageSize: 5,
  paginationPageSizeSelector: false,
  suppressPaginationPanel: true,
  suppressMovableColumns: true,
  alwaysShowHorizontalScroll: true,
};

// Function to generate expanded row data
function generateExpandedData() {
  const expandedData = [];
  gridOptions.rowData.forEach((row) => {
    expandedData.push(row);

    // If the row is expanded, add child rows for annual targets and target achievements
    if (expandedRows[row.id]) {
      expandedData.push(
        {
          id: `${row.id}_annual_target`, // Unique ID for the child row
          KPI_name: "ANNUAL TARGET",
          baselineStatus: "",
          target_set: "",
          coordinate_department: "",
          strategies: "", // Placeholder if necessary
          annual_target: row.annual_target,
        },
        {
          id: `${row.id}_target_achieved`, // Unique ID for the child row
          KPI_name: "TARGET ACHIEVED",
          baselineStatus: "",
          target_set: "",
          coordinate_department: "",
          strategies: "", // Placeholder if necessary
          target_achieved: row.target_achieved,
        }
      );
    }
  });
  return expandedData;
}

document.addEventListener("DOMContentLoaded", function () {
  // const gridDiv = document.querySelector("#myGrid");
  // gridApi = agGrid.createGrid(gridDiv, gridOptions);
  fetchDepartmentkpitracker();
  // const myModal = new bootstrap.Modal(document.getElementById("exampleModal"));
  // myModal.show();
});

function scroller(table) {
  // console.log(table);
  // console.log("scroller");
  let isMouseDown = false;
  let startX, scrollLeft;

  // Mouse down event
  table.addEventListener("mousedown", (e) => {
    console.log("mouse down");
    isMouseDown = true;
    startX = e.pageX - table.offsetLeft;
    scrollLeft = table.scrollLeft;
    // table.style.cursor = "grabbing";
  });

  // Mouse up event
  document.addEventListener("mouseup", () => {
    console.log("mouse up");
    isMouseDown = false;
    // table.style.cursor = "grab";
  });

  // Mouse move event to handle dragging
  table.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;
    e.preventDefault();
    const x = e.pageX - table.offsetLeft;
    const walk = (x - startX) * 2;
    table.scrollLeft = scrollLeft - walk;
    console.log(walk, scrollLeft);
  });
}

// fetch department kpi tracker
async function fetchDepartmentkpitracker() {
  const response = await fetch(
    `https://staging.thirdeyegfx.in/kpi_app/get_dep_kpi_tracker/${tok}`
  );

  const res = await fetch(
    `https://staging.thirdeyegfx.in/kpi_app/get_dep_dashboard/${tok}`
  );
  const dataTracker = await response.json();
  const data = await res.json();
  // console.log(dataTracker);
  department = dataTracker.department_name;
  console.log(department);
  // console.log("assigned kpi:", data);
  showkpi(data);

  initializeGrid(dataTracker);

  document.getElementById(
    "hello"
  ).innerHTML = `👋 Hello, Welcome to ${dataTracker.department_name}`;
}

function initializeGrid(data) {
  gridOptions.rowData = data.kpi_data;
  const gridDiv = document.querySelector("#myGrid");
  if (!gridApi) {
    gridApi = agGrid.createGrid(gridDiv, gridOptions);
  }
}

// department kpis
function showkpi(data) {
  // console.log(data);
  const box = document.getElementById("cards");

  data.kpi_data.map((kpi, index) => {
    const updatedDate = new Date(kpi.updated_at);
    const formattedDate = formatDate(updatedDate);

    const card = document.createElement("div");

    card.innerHTML = `<div class="mycard">
              <div class="card-header">
                <div>
                  <span class="card-title"
                    >${kpi.kpis}</span
                  >
                  <span class="card-subtitle"></span>
                </div>
                 <div class="card-num" >${index + 1}</div>
              </div>
              <div class="card-body">
                <div class="card-footer">
                  <span class="percentage"></span>
                  <span class="last-updated">LAST UPDATED: ${formattedDate}</span>
                </div>
              </div>
            </div>`;

    box.appendChild(card);
  });
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// for edits in kpi tracker
function makeEditable() {
  const leftSectionInputs = document
    .querySelector("#modalleft")
    .querySelectorAll("input");

  const strategyInput = document.querySelector("#strategies");

  leftSectionInputs.forEach((input) => {
    input.removeAttribute("readonly");
  });
  strategyInput.removeAttribute("readonly");
}

// Save changes and log inputs to the console
async function saveChanges(id) {
  console.log(id);
  const leftSectionInputs = document
    .querySelector("#modalleft")
    .querySelectorAll("input");

  const strategyInput = document.querySelector("#strategies");

  const updatedData = {};

  // Collect data from left section
  leftSectionInputs.forEach((input) => {
    const id = input.id;
    const value = input.value;
    updatedData[id] = value;

    input.setAttribute("readonly", true);
  });

  // Collect data from strategies
  updatedData["strategies"] = strategyInput.value;
  strategyInput.setAttribute("readonly", true);

  // console.log(updatedData);

  const formData = new FormData();
  formData.append("id", id);
  formData.append("strategies", updatedData.strategies);
  formData.append("y1", updatedData.t1);
  formData.append("y2", updatedData.t2);
  formData.append("y3", updatedData.t3);
  formData.append("y4", updatedData.t4);
  formData.append("y5", updatedData.t5);
  formData.append("token", tok);

  console.log(Object.fromEntries(formData.entries()));

  fetch(`https://staging.thirdeyegfx.in/kpi_app/update_dep_kpi`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //reload the page
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating status:", error);
    });
}

function actionButton(rowId) {
  const button = document.getElementById("saveChanges");
  button.addEventListener("click", () => {
    saveChanges(rowId.kpi_id);
  });

  console.log(rowId);
  const name = document.getElementById("kpiName");
  name.value = rowId.kpis;
  const kpiUnit = document.getElementById("kpiUnit");
  kpiUnit.value = rowId.unit_of_measurement;
  const baseLineStatus = document.getElementById("baseLineStatus");
  baseLineStatus.value = rowId.baseline_Status;
  const target5year = document.getElementById("target5year");
  target5year.value = rowId.t5;
  const deparment = document.getElementById("deparment");
  deparment.value = department;
  const strategies = document.getElementById("strategies");
  strategies.value = rowId.strategies;

  const year1 = document.getElementById("year1");
  year1.value = rowId.t1;
  const year2 = document.getElementById("year2");
  year2.value = rowId.t2;
  const year3 = document.getElementById("year3");
  year3.value = rowId.t3;
  const year4 = document.getElementById("year4");
  year4.value = rowId.t4;
  const year5 = document.getElementById("year5");
  year5.value = rowId.t5;

  const t1 = document.getElementById("t1");
  t1.value = rowId.y1 ? rowId.y1 : "00";
  const t2 = document.getElementById("t2");
  t2.value = rowId.y2 ? rowId.y2 : "00";
  const t3 = document.getElementById("t3");
  t3.value = rowId.y3 ? rowId.y3 : "00";
  const t4 = document.getElementById("t4");
  t4.value = rowId.y4 ? rowId.y4 : "00";
  const t5 = document.getElementById("t5");
  t5.value = rowId.y5 ? rowId.y5 : "00";
}
