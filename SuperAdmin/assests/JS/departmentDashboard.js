const gridOptions = {
  // Row Data: The data to be displayed.
  rowData: [
    {
      id: 1,
      department_name: "Department of Agriculture",
      STATUS: "APPROVED",
      KPINumber: "6",
      ACTION: "",
    },
    {
      id: 2,
      department_name: "Department of Education",
      STATUS: "REJECTED",
      KPINumber: "N/A",
      ACTION: "data",
    },
    {
      id: 3,
      department_name: "Department of Health",
      STATUS: "PENDING",
      KPINumber: "10",
      ACTION: "review",
    },
    {
      id: 4,
      department_name: "Department of Transportation",
      STATUS: "APPROVED",
      KPINumber: "4",
      ACTION: "",
    },
    {
      id: 5,
      department_name: "Department of Commerce",
      STATUS: "REJECTED",
      KPINumber: "N/A",
      ACTION: "data",
    },
    {
      id: 6,
      department_name: "Department of Energy",
      STATUS: "APPROVED",
      KPINumber: "8",
      ACTION: "",
    },
    {
      id: 7,
      department_name: "Department of Labor",
      STATUS: "PENDING",
      KPINumber: "5",
      ACTION: "follow-up",
    },
    {
      id: 8,
      department_name: "Department of Housing",
      STATUS: "REJECTED",
      KPINumber: "N/A",
      ACTION: "data",
    },
    {
      id: 9,
      department_name: "Department of Defense",
      STATUS: "APPROVED",
      KPINumber: "12",
      ACTION: "",
    },
    {
      id: 10,
      department_name: "Department of Interior",
      STATUS: "PENDING",
      KPINumber: "3",
      ACTION: "review",
    },
    {
      id: 11,
      department_name: "Department of Justice",
      STATUS: "APPROVED",
      KPINumber: "7",
      ACTION: "",
    },
    {
      id: 12,
      department_name: "Department of Treasury",
      STATUS: "REJECTED",
      KPINumber: "N/A",
      ACTION: "data",
    },
    {
      id: 13,
      department_name: "Department of Veteran Affairs",
      STATUS: "PENDING",
      KPINumber: "6",
      ACTION: "follow-up",
    },
    {
      id: 14,
      department_name: "Department of Homeland Security",
      STATUS: "APPROVED",
      KPINumber: "9",
      ACTION: "",
    },
    {
      id: 15,
      department_name: "Department of Public Works",
      STATUS: "REJECTED",
      KPINumber: "N/A",
      ACTION: "data",
    },
    {
      id: 16,
      department_name: "Department of Science",
      STATUS: "APPROVED",
      KPINumber: "3",
      ACTION: "",
    },
    {
      id: 17,
      department_name: "Department of Environmental Protection",
      STATUS: "PENDING",
      KPINumber: "4",
      ACTION: "review",
    },
    {
      id: 18,
      department_name: "Department of Foreign Affairs",
      STATUS: "APPROVED",
      KPINumber: "11",
      ACTION: "",
    },
    {
      id: 19,
      department_name: "Department of Social Services",
      STATUS: "REJECTED",
      KPINumber: "N/A",
      ACTION: "data",
    },
    {
      id: 20,
      department_name: "Department of Technology",
      STATUS: "APPROVED",
      KPINumber: "8",
      ACTION: "",
    },
  ],

  columnDefs: [
    {
      field: "department_name",
      headerName: "DEPARTMENT NAME",
      cellRenderer: (params) => {
        let data = JSON.stringify(params.data).replace(/"/g, "&quot;");
        let name = params.data.department_name;

        return `<p style="font-weight: 500; cursor: pointer;" 
           data-bs-toggle="modal" data-bs-target="#exampleModal" 
           onclick="handleDepartment('${data}')">${name}</p>`;
      },
    },
    {
      field: "STATUS",
      headerName: "APPROVAL STATUS",
      cellRenderer: (params) => {
        const value = params.data.STATUS;
        let content = "";
        let color = "";
        let backgroundColor = "";
        let border = "";

        if (value === "APPROVED") {
          content = "✓ APPROVED";
          color = "#0FAF62";
          backgroundColor = "#EDFFF3";
          border = "0.5px solid #0FAF62";
        } else if (value === "REJECTED") {
          content = "☓ REJECTED";
          color = "#F44336";
          backgroundColor = "#FDEDED";
          border = "0.5px solid #F44336";
        } else {
           return `
           <div style="display: flex; gap: 10px;" >
           <div style="color:#0FAF62 ; border: 0.5px solid #0FAF62 ; background-color: #EDFFF3 ; padding: 0 8px; border-radius: 4px; font-weight: 500; ">
           ✓ APPROVED
           </div>
           <div style="color:#F44336 ; border: 0.5px solid #F44336 ; background-color: #FDEDED ; padding: 0 8px; border-radius: 4px; font-weight: 500; ">
           ✓ APPROVED
           </div>
           </div>

     
    `;
        }

        // Return the HTML string with styles directly applied
        return `<div style="color: ${color}; border: ${border}; background-color: ${backgroundColor}; padding: 0 8px; border-radius: 4px; font-weight: 500; ">
        ${content}
    </div>`;
      },
    },
    { field: "KPINumber", headerName: "No. OF KPI’S ASSIGNED" },

    {
      field: "id",
      headerName: "ACTION",
      cellRenderer: function (params) {
        // If ACTION is empty, don't render a button
        if (params.data.STATUS === "REJECTED" || params.data.STATUS === "PENDING") {
          return "";
        }

        const data = JSON.stringify(params.data).replace(/"/g, "&quot;");
        return `
        <div style="display: flex; gap: 10px;" >
          <button
            type="button"
            class="btn btn-outline-success rounded-pill"
            data-bs-toggle="modal"
            data-bs-target="#assignModal"
            onclick="handleDetails(${data})"
          >
            Assign KPI
          </button>
          <button
            type="button"
            class="btn border border-2 rounded-pill"
            onclick="handleDetails(${data})"
          >
          <i class="bi bi-file-earmark-arrow-down"></i>
            Download Report
          </button>
        </div>
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
    return 80;
  },

  onFirstDataRendered: function (params) {
    updatePaginationSummary(params);
    // console.log(params);
  },

  onPaginationChanged: function () {
    updatePaginationSummary(params);
  },
  onPaginationChanged: function (param) {
    updateCustomPagination(param);
    // console.log(param)
  },
  pagination: true,
  paginationPageSize: 5,
  paginationPageSizeSelector: false,
  suppressPaginationPanel: true,
};



// for showing pagination control
function updatePaginationSummary(p) {
  const numberPannel = document.querySelector("#paginationNumbers");
  const totalRows = p.api.getDisplayedRowCount();
  const startRow = p.api.getFirstDisplayedRow() + 1;
  const endRow = p.api.getLastDisplayedRow() + 1;

  numberPannel.innerHTML = `Showing ${startRow} to ${endRow} of ${totalRows} entries`;
}

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#myGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);
});

function handleDetails(data) {
  console.log(data);
}

// for number pagination control BUttons
function updateCustomPagination(data) {
  const totalPages = data.api.paginationGetTotalPages();
  const currentPage = data.api.paginationGetCurrentPage();
  const paginationControls = document.getElementById("paginationControler");

  paginationControls.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.textContent = i + 1;
    pageButton.classList.add("pagination-button");

    pageButton.addEventListener("click", function () {
      data.api.paginationGoToPage(i);
    });

    if (i === currentPage) {
      pageButton.style.backgroundColor = "#5FA777";
      pageButton.style.color = "white";
    }

    paginationControls.appendChild(pageButton);
  }

  const prevButton = document.createElement("button");
  prevButton.textContent = "←";
  prevButton.setAttribute("id", "arrow-button");
  prevButton.addEventListener("click", function () {
    if (currentPage > 0) {
      data.api.paginationGoToPage(currentPage - 1);
    }
  });

  const nextButton = document.createElement("button");
  nextButton.textContent = "→";
  nextButton.setAttribute("id", "arrow-button");
  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages - 1) {
      data.api.paginationGoToPage(currentPage + 1);
    }
  });

  paginationControls.insertBefore(prevButton, paginationControls.firstChild);
  paginationControls.appendChild(nextButton);
}

function handleDepartment(data) {
  const departmentData = JSON.parse(data);
  console.log(departmentData);
}