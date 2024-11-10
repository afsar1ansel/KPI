let expandedRows = {}; // Track expanded rows

const gridOptions = {
  // Row Data: The data to be displayed.
  rowData: [
    {
      id: 1,
      KPI_name:
        "Promotion of Climate Smart Crops (Millets, Pulses & Oil Seeds) Suitable to changing environmental conditions (In Lakh Ha.)",
      baselineStatus: "33.20",
      target_set: "32.70",
      coordinate_department: "Department of Agriculture",
      strategies:
        "Promote new varieties of millets by providing subsidies & production incentives to farmers & create awareness about its importance.",
      annual_target: {
        yr1: "33.20",
        yr2: "33.20",
        yr3: "33.20",
        yr4: "33.20",
        yr5: "33.20",
      },
      target_achieved: {
        yr1: "33.20",
        yr2: "33.20",
        yr3: "33.20",
        yr4: "33.20",
        yr5: "33.20",
      },
    },
  ],

  columnDefs: [
    {
      field: "KPI_name",
      headerName: "KPI Name",
      maxWidth: 400,
    },
    {
      field: "baselineStatus",
      headerName: "BASELINE STATUS",
      maxWidth: 400,
    },
    {
      field: "target_set",
      headerName: "TARGET SET for 5 YEARS",
      maxWidth: 300,
    },

    {
      field: "coordinate_department",
      headerName: "COORDINATING DEPARTMENT",
      maxWidth: 400,
    },
    {
      field: "strategies",
      headerName: "STRATEGIES",
      maxWidth: 400,
    },
    {
      headerName: "ANNUAL TARGET",
      children: [
        { field: "annual_target.yr1", headerName: "YR1", maxWidth: 100 },
        { field: "annual_target.yr2", headerName: "YR2", maxWidth: 100 },
        { field: "annual_target.yr3", headerName: "YR3", maxWidth: 100 },
        { field: "annual_target.yr4", headerName: "YR4", maxWidth: 100 },
        { field: "annual_target.yr5", headerName: "YR5", maxWidth: 100 },
      ],
    },
    {
      headerName: "TARGET ACHIEVED",
      children: [
        { field: "target_achieved.yr1", headerName: "YR1", maxWidth: 100 },
        { field: "target_achieved.yr2", headerName: "YR2", maxWidth: 100 },
        { field: "target_achieved.yr3", headerName: "YR3", maxWidth: 100 },
        { field: "target_achieved.yr4", headerName: "YR4", maxWidth: 100 },
        { field: "target_achieved.yr5", headerName: "YR5", maxWidth: 100 },
      ],
    },
    {
      field: "id",
      headerName: "ACTION",
      cellRenderer: function (params) {
        const dataId = params.data.id;
        const isExpanded = expandedRows[dataId];
        return `
          <button onclick="toggleRow(${dataId})">Action</button>
        `;
      },
    },
  ],
  defaultColDef: {
    sortable: true,
    filter: "agTextColumnFilter",
    resizable: false,
    flex: 1,
    filterParams: {
      debounceMs: 0,
      buttons: ["reset"],
    },
  },
  domLayout: "autoHeight",
  getRowHeight: function (params) {
    return params.node.detail ? 150 : 80;
  },

  pagination: false,
  paginationPageSize: 5,
  paginationPageSizeSelector: false,
  suppressPaginationPanel: true,
};

// Function to toggle row expansion
function toggleRow(rowId) {
  console.log(rowId)
}

// Function to generate expanded row data
function generateExpandedData() {
  const expandedData = [];
  gridOptions.rowData.forEach((row) => {
    expandedData.push(row); // Add parent row

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

// for showing pagination control
// function updatePaginationSummary(p) {
//   const numberPannel = document.querySelector("#paginationNumbers");
//   const totalRows = p.api.getDisplayedRowCount();
//   const startRow = p.api.getFirstDisplayedRow() + 1;
//   const endRow = p.api.getLastDisplayedRow() + 1;

//   numberPannel.innerHTML = `Showing ${startRow} to ${endRow} of ${totalRows} entries`;
// }

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#myGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);
});

// // for number pagination control BUttons
// function updateCustomPagination(data) {
//   const totalPages = data.api.paginationGetTotalPages();
//   const currentPage = data.api.paginationGetCurrentPage();
//   const paginationControls = document.getElementById("paginationControler");

//   paginationControls.innerHTML = "";

//   for (let i = 0; i < totalPages; i++) {
//     const pageButton = document.createElement("button");
//     pageButton.textContent = i + 1;
//     pageButton.classList.add("pagination-button");

//     pageButton.addEventListener("click", function () {
//       data.api.paginationGoToPage(i);
//     });

//     if (i === currentPage) {
//       pageButton.style.backgroundColor = "#5FA777";
//       pageButton.style.color = "white";
//     }

//     paginationControls.appendChild(pageButton);
//   }

//   const prevButton = document.createElement("button");
//   prevButton.textContent = "←";
//   prevButton.setAttribute("id", "arrow-button");
//   prevButton.addEventListener("click", function () {
//     if (currentPage > 0) {
//       data.api.paginationGoToPage(currentPage - 1);
//     }
//   });

//   const nextButton = document.createElement("button");
//   nextButton.textContent = "→";
//   nextButton.setAttribute("id", "arrow-button");
//   nextButton.addEventListener("click", function () {
//     if (currentPage < totalPages - 1) {
//       data.api.paginationGoToPage(currentPage + 1);
//     }
//   });

//   paginationControls.insertBefore(prevButton, paginationControls.firstChild);
//   paginationControls.appendChild(nextButton);
// }
