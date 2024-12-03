console.log("recent")

const gridOptions = {
  onGridReady: function (params) {
    gridApi1 = params.api;
  },
  // Row Data: The data to be displayed.
  rowData: [
    {
      id: 1,
      "DEPARTMENT NAME": "Department of Agriculture",
      "LAST UPDATED DATE": "24/10/2024",
      "TREND(UP/DOWN)": "1.2 % Increase",
      "TARGET SET FOR 5 YEARS": 33.26,
      "LAST TARGET UPDATE": "31.02",
    },
    {
      id: 2,
      "DEPARTMENT NAME": "Department of Health",
      "LAST UPDATED DATE": "15/11/2024",
      "TREND(UP/DOWN)": "2.5 % Decrease",
      "TARGET SET FOR 5 YEARS": 28.75,
      "LAST TARGET UPDATE": "29.50",
    },
    {
      id: 3,
      "DEPARTMENT NAME": "Department of Education",
      "LAST UPDATED DATE": "03/09/2024",
      "TREND(UP/DOWN)": " Stable",
      "TARGET SET FOR 5 YEARS": 40.12,
      "LAST TARGET UPDATE": "40.12",
    },
    {
      id: 4,
      "DEPARTMENT NAME": "Department of Energy",
      "LAST UPDATED DATE": "28/07/2024",
      "TREND(UP/DOWN)": "1.7 % Increase",
      "TARGET SET FOR 5 YEARS": 65.0,
      "LAST TARGET UPDATE": "63.12",
    },
    {
      id: 5,
      "DEPARTMENT NAME": "Department of Transportation",
      "LAST UPDATED DATE": "14/05/2024",
      "TREND(UP/DOWN)": "2.0 % Increase",
      "TARGET SET FOR 5 YEARS": 50.5,
      "LAST TARGET UPDATE": "49.32",
    },
    {
      id: 6,
      "DEPARTMENT NAME": "Department of Defense",
      "LAST UPDATED DATE": "20/04/2024",
      "TREND(UP/DOWN)": "3.1 % Decrease",
      "TARGET SET FOR 5 YEARS": 75.6,
      "LAST TARGET UPDATE": "78.25",
    },
    {
      id: 7,
      "DEPARTMENT NAME": "Department of Justice",
      "LAST UPDATED DATE": "11/02/2024",
      "TREND(UP/DOWN)": "1.4 % Increase",
      "TARGET SET FOR 5 YEARS": 30.4,
      "LAST TARGET UPDATE": "29.87",
    },
    {
      id: 8,
      "DEPARTMENT NAME": "Department of Commerce",
      "LAST UPDATED DATE": "05/03/2024",
      "TREND(UP/DOWN)": "0.5 % Increase",
      "TARGET SET FOR 5 YEARS": 45.9,
      "LAST TARGET UPDATE": "45.67",
    },
    {
      id: 9,
      "DEPARTMENT NAME": "Department of Labor",
      "LAST UPDATED DATE": "22/12/2024",
      "TREND(UP/DOWN)": "2.3 % Increase",
      "TARGET SET FOR 5 YEARS": 35.8,
      "LAST TARGET UPDATE": "34.12",
    },
    {
      id: 10,
      "DEPARTMENT NAME": "Department of Treasury",
      "LAST UPDATED DATE": "19/11/2024",
      "TREND(UP/DOWN)": "1.9 % Decrease",
      "TARGET SET FOR 5 YEARS": 22.5,
      "LAST TARGET UPDATE": "23.12",
    },
    {
      id: 11,
      "DEPARTMENT NAME": "Department of Homeland Security",
      "LAST UPDATED DATE": "30/08/2024",
      "TREND(UP/DOWN)": "1.2 % Increase",
      "TARGET SET FOR 5 YEARS": 55.75,
      "LAST TARGET UPDATE": "54.60",
    },
    {
      id: 12,
      "DEPARTMENT NAME": "Department of Housing",
      "LAST UPDATED DATE": "07/06/2024",
      "TREND(UP/DOWN)": "0.9 % Increase",
      "TARGET SET FOR 5 YEARS": 40.1,
      "LAST TARGET UPDATE": "39.20",
    },
    {
      id: 13,
      "DEPARTMENT NAME": "Department of Veterans Affairs",
      "LAST UPDATED DATE": "02/01/2024",
      "TREND(UP/DOWN)": "1.0 % Increase",
      "TARGET SET FOR 5 YEARS": 27.3,
      "LAST TARGET UPDATE": "26.90",
    },
    {
      id: 14,
      "DEPARTMENT NAME": "Department of Foreign Affairs",
      "LAST UPDATED DATE": "12/09/2024",
      "TREND(UP/DOWN)": "1.5 % Decrease",
      "TARGET SET FOR 5 YEARS": 34.55,
      "LAST TARGET UPDATE": "35.10",
    },
    {
      id: 15,
      "DEPARTMENT NAME": "Department of Environment",
      "LAST UPDATED DATE": "09/10/2024",
      "TREND(UP/DOWN)": "2.4 % Increase",
      "TARGET SET FOR 5 YEARS": 42.1,
      "LAST TARGET UPDATE": "40.75",
    },
    {
      id: 16,
      "DEPARTMENT NAME": "Department of Communications",
      "LAST UPDATED DATE": "26/03/2024",
      "TREND(UP/DOWN)": "0.6 % Increase",
      "TARGET SET FOR 5 YEARS": 29.5,
      "LAST TARGET UPDATE": "29.10",
    },
    {
      id: 17,
      "DEPARTMENT NAME": "Department of Tourism",
      "LAST UPDATED DATE": "13/04/2024",
      "TREND(UP/DOWN)": "1.1 % Increase",
      "TARGET SET FOR 5 YEARS": 23.4,
      "LAST TARGET UPDATE": "22.85",
    },
    {
      id: 18,
      "DEPARTMENT NAME": "Department of Science and Technology",
      "LAST UPDATED DATE": "18/05/2024",
      "TREND(UP/DOWN)": "1.7 % Decrease",
      "TARGET SET FOR 5 YEARS": 37.9,
      "LAST TARGET UPDATE": "38.30",
    },
    {
      id: 19,
      "DEPARTMENT NAME": "Department of Infrastructure",
      "LAST UPDATED DATE": "21/07/2024",
      "TREND(UP/DOWN)": "2.2 % Increase",
      "TARGET SET FOR 5 YEARS": 60.8,
      "LAST TARGET UPDATE": "59.75",
    },
    {
      id: 20,
      "DEPARTMENT NAME": "Department of Arts and Culture",
      "LAST UPDATED DATE": "29/11/2024",
      "TREND(UP/DOWN)": "1.6 % Increase",
      "TARGET SET FOR 5 YEARS": 18.7,
      "LAST TARGET UPDATE": "18.12",
    },
  ],

  columnDefs: [
    { field: "DEPARTMENT NAME", headerName: "DEPARTMENT NAME" },
    {
      field: "LAST UPDATED DATE",
      headerName: "LAST UPDATED DATE",
      cellRenderer: (params) => {
        const data = JSON.stringify(params.data).replace(/"/g, "&quot;");
        console.log(params);
        return `<p style=" font-weight: 500; text-decoration: underline; cursor: pointer" onclick="showHistory(${data})" >View History</p>`;
      },
    },
    {
      field: "TREND(UP/DOWN)",
      headerName: "TREND(UP/DOWN)",
      cellRenderer: (params) => {
        const value = params.value;
        let icon = "";
        let color = "";

        if (value.includes("Increase")) {
          icon = "↑"; // Up arrow
          color = "green";
        } else if (value.includes("Decrease")) {
          icon = "↓"; // Down arrow
          color = "red";
        } else {
          icon = "→ "; // Right arrow
          color = "blue";
        }

        return `<span style="color: ${color}; font-weight: 500;"> 
                ${icon} ${value}
              </span>`;
      },
    },
    { field: "TARGET SET FOR 5 YEARS", headerName: "TARGET SET FOR 5 YEARS" },
    { field: "LAST TARGET UPDATE", headerName: "LAST TARGET UPDATE" },
    {
      field: "id",
      headerName: "ACTION",
      cellRenderer: function (params) {
        const data = JSON.stringify(params.data).replace(/"/g, "&quot;");
        return `
      <button
        type="button"
        class="btn btn-outline-success rounded-pill"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onclick="handleDetails(${data})"
      >
        View Details
      </button>
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
    updatePaginationSummary(param);
    // console.log(param)
  },
  // rowModelType : "infinite",
  pagination: true,
  paginationPageSize: 6,
  paginationPageSizeSelector: false,
  suppressPaginationPanel: true,
};

// for showing pagination control
function updatePaginationSummary(p) {
  const numberPannel = document.querySelector("#paginationNumbers");
  const totalRows = p.api.getDisplayedRowCount();
  const startRow = p.api.getFirstDisplayedRow() + 1;
  const endRow = p.api.getLastDisplayedRow() + 1;

  numberPannel.innerHTML = `<div id="paginationNumb"><p>Showing ${startRow} to ${endRow} of ${totalRows} entries</p></div>`;
}

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#myGrid");
  gridApi1 = agGrid.createGrid(gridDiv, gridOptions);
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

function showHistory(data) {
  console.log(data);
}