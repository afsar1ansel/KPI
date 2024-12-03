const gridOptions1 = {
  // Row Data: The data to be displayed.
  rowData: [
    {
      id: 1,
      "DEPARTMENT NAME": "Department of Agriculture",
      "REQUIRED UPDATED DEADLINE": "24/10/2024",
      "DEADLINE STATUS": "Pending from 100 days",
    },
    {
      id: 2,
      "DEPARTMENT NAME": "Department of Finance",
      "REQUIRED UPDATED DEADLINE": "30/10/2024",
      "DEADLINE STATUS": "Pending from 95 days",
    },
    {
      id: 3,
      "DEPARTMENT NAME": "Department of Education",
      "REQUIRED UPDATED DEADLINE": "10/11/2024",
      "DEADLINE STATUS": "Pending from 80 days",
    },
    {
      id: 4,
      "DEPARTMENT NAME": "Department of Health",
      "REQUIRED UPDATED DEADLINE": "15/11/2024",
      "DEADLINE STATUS": "Pending from 75 days",
    },
    {
      id: 5,
      "DEPARTMENT NAME": "Department of Transportation",
      "REQUIRED UPDATED DEADLINE": "20/11/2024",
      "DEADLINE STATUS": "Pending from 70 days",
    },
    {
      id: 6,
      "DEPARTMENT NAME": "Department of Housing",
      "REQUIRED UPDATED DEADLINE": "05/12/2024",
      "DEADLINE STATUS": "Pending from 55 days",
    },
    {
      id: 7,
      "DEPARTMENT NAME": "Department of Energy",
      "REQUIRED UPDATED DEADLINE": "12/12/2024",
      "DEADLINE STATUS": "Pending from 48 days",
    },
    {
      id: 8,
      "DEPARTMENT NAME": "Department of Environment",
      "REQUIRED UPDATED DEADLINE": "18/12/2024",
      "DEADLINE STATUS": "Pending from 42 days",
    },
    {
      id: 9,
      "DEPARTMENT NAME": "Department of Foreign Affairs",
      "REQUIRED UPDATED DEADLINE": "25/12/2024",
      "DEADLINE STATUS": "Pending from 35 days",
    },
    {
      id: 10,
      "DEPARTMENT NAME": "Department of Justice",
      "REQUIRED UPDATED DEADLINE": "01/01/2025",
      "DEADLINE STATUS": "Pending from 30 days",
    },
    {
      id: 11,
      "DEPARTMENT NAME": "Department of Labor",
      "REQUIRED UPDATED DEADLINE": "15/01/2025",
      "DEADLINE STATUS": "Pending from 20 days",
    },
    {
      id: 12,
      "DEPARTMENT NAME": "Department of Public Safety",
      "REQUIRED UPDATED DEADLINE": "22/01/2025",
      "DEADLINE STATUS": "Pending from 15 days",
    },
    {
      id: 13,
      "DEPARTMENT NAME": "Department of Tourism",
      "REQUIRED UPDATED DEADLINE": "02/02/2025",
      "DEADLINE STATUS": "Pending from 10 days",
    },
    {
      id: 14,
      "DEPARTMENT NAME": "Department of Defense",
      "REQUIRED UPDATED DEADLINE": "10/02/2025",
      "DEADLINE STATUS": "Pending from 5 days",
    },
    {
      id: 15,
      "DEPARTMENT NAME": "Department of Communication",
      "REQUIRED UPDATED DEADLINE": "18/02/2025",
      "DEADLINE STATUS": "Pending from 3 days",
    },
    {
      id: 16,
      "DEPARTMENT NAME": "Department of Science and Technology",
      "REQUIRED UPDATED DEADLINE": "25/02/2025",
      "DEADLINE STATUS": "Pending from 2 days",
    },
    {
      id: 17,
      "DEPARTMENT NAME": "Department of Social Welfare",
      "REQUIRED UPDATED DEADLINE": "05/03/2025",
      "DEADLINE STATUS": "Pending from 1 day",
    },
    {
      id: 18,
      "DEPARTMENT NAME": "Department of Commerce",
      "REQUIRED UPDATED DEADLINE": "12/03/2025",
      "DEADLINE STATUS": "Pending from 0 days",
    },
    {
      id: 19,
      "DEPARTMENT NAME": "Department of Agriculture",
      "REQUIRED UPDATED DEADLINE": "20/03/2025",
      "DEADLINE STATUS": "Pending from 1 day",
    },
    {
      id: 20,
      "DEPARTMENT NAME": "Department of Urban Development",
      "REQUIRED UPDATED DEADLINE": "30/03/2025",
      "DEADLINE STATUS": "Pending from 5 days",
    },
  ],
  columnDefs: [
    { field: "DEPARTMENT NAME", headerName: "DEPARTMENT NAME" },
    {
      field: "REQUIRED UPDATED DEADLINE",
      headerName: "REQUIRED UPDATED DEADLINE",
    },
    {
      field: "DEADLINE STATUS",
      headerName: "DEADLINE STATUS",
      cellStyle: { color: "red" },
    },
    {
      field: "id",
      headerName: "ACTION",
      cellRenderer: function (params) {
        const data = JSON.stringify(params.data).replace(/"/g, "&quot;");
        return `
      <button
        type="button"
        class="btn btn-outline-success rounded-pill"
        onclick="handleDetails(${data})"
      >
        Send Update Remider
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
    updatePaginationSummary1(params);
    // console.log(params);
  },

  onPaginationChanged: function (param) {
    updateCustomPagination1(param);
    updatePaginationSummary1(param);
    // console.log(param)
  },
  pagination: true,
  paginationPageSize: 6,
  paginationPageSizeSelector: false,
  suppressPaginationPanel: true,
};

document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#myGrid1");
  gridApi = agGrid.createGrid(gridDiv, gridOptions1);
});

function updateCustomPagination1(data) {
  const totalPages = data.api.paginationGetTotalPages();
  const currentPage = data.api.paginationGetCurrentPage();
  //   const paginationControls = document.getElementById("paginationControler");
  const paginationControls1 = document.getElementById("paginationControler1");

  //   paginationControls.innerHTML = "";
  paginationControls1.innerHTML = "";

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

    paginationControls1.appendChild(pageButton);
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

  paginationControls1.insertBefore(prevButton, paginationControls1.firstChild);
  paginationControls1.appendChild(nextButton);
}

function updatePaginationSummary1(p) {
  // console.log(p)
  const numberPannel = document.querySelector("#paginationNumbers1");
  const totalRows = p.api.getDisplayedRowCount();
  const startRow = p.api.getFirstDisplayedRow() + 1;
  const endRow = p.api.getLastDisplayedRow() + 1;

  numberPannel.innerHTML = `<div id="paginationNumb" ><p>Showing ${startRow} to ${endRow} of ${totalRows} entries</p></div>`;
}
