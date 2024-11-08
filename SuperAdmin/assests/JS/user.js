const gridOptions = {
  // Row Data: The data to be displayed.
  rowData : [
    { id: 1, name: "Rahul Patel", email: "nqWbA@example.com", role: "Super Admin", status: "Active" },
    { id: 2, name: "Rajesh Kumar", email: "rajesh@example.com", role: "Admin", status: "Inactive" },
    { id: 3, name: "Amit Sharma", email: "amit.sharma@example.com", role: "User", status: "Active" },
    { id: 4, name: "Priya Singh", email: "priya.singh@example.com", role: "User", status: "Inactive" },
    { id: 5, name: "Sunil Yadav", email: "sunil.yadav@example.com", role: "Moderator", status: "Active" },
    { id: 6, name: "Neha Joshi", email: "neha.joshi@example.com", role: "User", status: "Active" },
    { id: 7, name: "Vikram Desai", email: "vikram.desai@example.com", role: "Admin", status: "Inactive" },
    { id: 8, name: "Ayesha Khan", email: "ayesha.khan@example.com", role: "Moderator", status: "Active" },
    { id: 9, name: "Siddharth Pandey", email: "sid.pandey@example.com", role: "User", status: "Inactive" },
    { id: 10, name: "Kiran Mehta", email: "kiran.mehta@example.com", role: "Admin", status: "Active" },
    { id: 11, name: "Ravi Narayan", email: "ravi.narayan@example.com", role: "Super Admin", status: "Inactive" },
    { id: 12, name: "Sneha Bhat", email: "sneha.bhat@example.com", role: "User", status: "Active" },
    { id: 13, name: "Anil Goel", email: "anil.goel@example.com", role: "User", status: "Inactive" },
    { id: 14, name: "Komal Jain", email: "komal.jain@example.com", role: "Moderator", status: "Active" },
    { id: 15, name: "Manish Rathi", email: "manish.rathi@example.com", role: "Admin", status: "Inactive" },
    { id: 16, name: "Pooja Patel", email: "pooja.patel@example.com", role: "User", status: "Active" },
    { id: 17, name: "Gaurav Sinha", email: "gaurav.sinha@example.com", role: "Moderator", status: "Inactive" },
    { id: 18, name: "Shweta Mishra", email: "shweta.mishra@example.com", role: "Admin", status: "Active" },
    { id: 19, name: "Ramesh Chandra", email: "ramesh.chandra@example.com", role: "User", status: "Inactive" },
    { id: 20, name: "Kunal Agarwal", email: "kunal.agarwal@example.com", role: "Super Admin", status: "Active" }
],


  columnDefs: [
    {
      field: "name",
      headerName: "Name Of User",
      maxWidth: 400,
    },
    {
      field: "email",
      headerName: "Email ID",
      maxWidth: 400,
    },
    { field: "role", headerName: "ROLE", maxWidth: 300 },

    {
      field: "status",
      headerName: "STATUS",
    // code need
    },
    {
      field: "id",
      headerName: "ACTION",
      cellRenderer: function (params) {
     const dataId = params.data.id; 
     return `
    <i class="bi bi-pencil-square" onclick="handleEditClick(${dataId})"></i> 
    <i class="bi bi-trash" onclick="handleDeleteClick(${dataId})"></i>
  `;
      },
    }
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


function handleEditClick(id) {
  console.log("Edit clicked for ID:", id);
}

function handleDeleteClick(id) {
  console.log("Delete clicked for ID:", id);
}
