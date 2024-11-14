let expandedRows = {};

const gridOptions = {
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
      date: "24/10/2023",
    },
  ],

  columnDefs: [
    {
      field: "KPI_name",
      headerName: "KPI NAME",
      maxWidth: 190,
      cellRenderer: function (params) {
        const dataHead = params.data.KPI_name;
        const date = params.data.date;

        return `<div><p>${dataHead}</p><p id="trackerDate">LAST UPDATED: ${date}</p></div>`;
      },
    },
    {
      field: "baselineStatus",
      headerName: "BASELINE STATUS",
      maxWidth: 120,
    },
    {
      field: "target_set",
      headerName: "TARGET SET for 5 YEARS",
      maxWidth: 120,
    },
    {
      field: "coordinate_department",
      headerName: "COORDINATING DEPARTMENT",
      maxWidth: 130,
    },
    {
      field: "strategies",
      headerName: "STRATEGIES",
      maxWidth: 200,
    },
    {
      headerName: "ANNUAL TARGET",
      headerClass: "annual-target-header",
      children: [
        {
          field: "annual_target.yr1",
          headerName: "YR1",
          maxWidth: 80,
          // cellClass: "center-align",
        },
        { field: "annual_target.yr2", headerName: "YR2", maxWidth: 80 },
        { field: "annual_target.yr3", headerName: "YR3", maxWidth: 80 },
        { field: "annual_target.yr4", headerName: "YR4", maxWidth: 80 },
        { field: "annual_target.yr5", headerName: "YR5", maxWidth: 80 },
      ],
    },
    {
      headerName: "TARGET ACHIEVED",
      headerClass: "annual-target-header",
      children: [
        { field: "target_achieved.yr1", headerName: "YR1", maxWidth: 80 },
        { field: "target_achieved.yr2", headerName: "YR2", maxWidth: 80 },
        { field: "target_achieved.yr3", headerName: "YR3", maxWidth: 80 },
        { field: "target_achieved.yr4", headerName: "YR4", maxWidth: 80 },
        { field: "target_achieved.yr5", headerName: "YR5", maxWidth: 80 },
      ],
    },
    {
      field: "id",
      headerName: "ACTION",
      cellRenderer: function (params) {
        const dataId = params.data.id;
        // const isExpanded = expandedRows[dataId];
        return `
          <button class="btn btn-success rounded-pill" onclick="toggleRow(${dataId})">Update</button>
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

// Function to toggle row expansion
function toggleRow(rowId) {
  console.log(rowId);
}

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
  const gridDiv = document.querySelector("#myGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);

  const table = document.querySelector(".ag-root-wrapper");
  if (table) {
    scroller(table);
  }
});

function scroller(table) {
  console.log(table);
  console.log("scroller");
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
    const walk = (x - startX) * 2; // Adjust scrolling speed if necessary
    table.scrollLeft = scrollLeft - walk;
    console.log(walk, scrollLeft);
  });
}
