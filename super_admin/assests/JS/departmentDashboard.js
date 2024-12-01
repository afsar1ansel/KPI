const tok = localStorage.getItem("authToken");
let gridApi;
let datas;
let deptId;
// console.log("department")
async function fetchdetails(tok) {
  try {
    const response = await fetch(
      `https://staging.thirdeyegfx.in/kpi_app/department/get_status/${tok}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    datas = await data;
    // console.log(data);
    // deptId = data.department_status[0].dept_master_id;
    initializeGrid(data);
  } catch (error) {
    console.error("Error fetching department status:", error);
    return null;
  }
}

function initializeGrid(data) {
  // console.log(data);
  gridOptions.rowData = data.department_status;
  const gridDiv = document.querySelector("#myGrid");
  if (!gridApi) {
    gridApi = agGrid.createGrid(gridDiv, gridOptions);
  }
}

// usege
const gridOptions = {
  rowData: [],

  columnDefs: [
    {
      field: "dept_name",
      headerName: "DEPARTMENT NAME",
      maxWidth: 400,
      cellRenderer: (params) => {
        let data = JSON.stringify(params.data).replace(/"/g, "&quot;");
        let name = params.data.dept_name;
        console.log(params);
        return `<p style="font-weight: 500; cursor: pointer;" 
           data-bs-toggle="modal" data-bs-target="#exampleModal" 
           onclick="handleDepartment('${data}')">${name}</p>`;
      },
    },
    {
      field: "approval_status",
      headerName: "APPROVAL STATUS",
      maxWidth: 400,
      cellRenderer: (params) => {
        // console.log("params: ", params);
        const value = params.data.approval_status;
        const id = params.data.department_id;
        let content = "";
        let color = "";
        let backgroundColor = "";
        let border = "";

        if (value == 1) {
          content = "✓ APPROVED";
          color = "#0FAF62";
          backgroundColor = "#EDFFF3";
          border = "0.5px solid #0FAF62";
        } else if (value == 2) {
          content = "☓ REJECTED";
          color = "#F44336";
          backgroundColor = "#FDEDED";
          border = "0.5px solid #F44336";
        } else {
          // Create Approve and Reject buttons dynamically
          const approveButton = document.createElement("div");
          approveButton.style.color = "#0FAF62";
          approveButton.style.border = "0.5px solid #0FAF62";
          approveButton.style.backgroundColor = "#EDFFF3";
          approveButton.style.padding = "0 8px";
          approveButton.style.borderRadius = "4px";
          approveButton.style.fontWeight = "500";
          approveButton.style.cursor = "pointer";
          approveButton.innerText = "✓ APPROVE";

          const rejectButton = document.createElement("div");
          rejectButton.style.color = "#F44336";
          rejectButton.style.border = "0.5px solid #F44336";
          rejectButton.style.backgroundColor = "#FDEDED";
          rejectButton.style.padding = "0 8px";
          rejectButton.style.borderRadius = "4px";
          rejectButton.style.fontWeight = "500";
          rejectButton.style.cursor = "pointer";
          rejectButton.innerText = "☓ REJECT";

          // Add click listeners to log the appropriate message
          approveButton.addEventListener("click", () => {
            // console.log(`ID ${id}: APPROVE clicked`);
            toggleStatus(id, 1);
          });

          rejectButton.addEventListener("click", () => {
            // console.log(`ID ${id}: REJECT clicked`);
            toggleStatus(id, 2);
          });

          // Create a container div to hold both buttons
          const container = document.createElement("div");
          container.style.display = "flex";
          container.style.gap = "10px";
          container.appendChild(approveButton);
          container.appendChild(rejectButton);

          // Return the container as the cell's content
          return container;
        }

        // Return styled content for APPROVED or REJECTED
        const div = document.createElement("div");
        div.style.color = color;
        div.style.border = border;
        div.style.backgroundColor = backgroundColor;
        div.style.padding = "0 8px";
        div.style.borderRadius = "4px";
        div.style.fontWeight = "500";
        div.innerText = content;
        return div;
      },
    },
    {
      field: "kpi_count",
      headerName: "No. OF KPI’S ASSIGNED",
      maxWidth: 300,
      cellRenderer: (params) => {
        let data = JSON.stringify(params.data).replace(/"/g, "&quot;");

        return `<p style="font-weight: 500; cursor: pointer;" 
        data-bs-toggle="modal" data-bs-target="#kpiNumbersModal"
           onclick="handleKpiNUmberModal('${data}')">${params.data.kpi_count}</p>`;
      },
    },

    {
      field: "id",
      headerName: "ACTION",
      cellRenderer: function (params) {
        // If ACTION is empty, don't render a button
        if (
          params.data.approval_status == 2 ||
          params.data.approval_status == 0
        ) {
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
            onclick="handleAssignClick(${data})"
          >
            Assign KPI
          </button>
          <button
            type="button"
            class="btn border border-2 rounded-pill"
            onclick="handleDownloadClick(${data})"
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
    updatePaginationSummary(param);
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

async function handleAssignClick(data) {
  console.log(data);
  deptId = data.dept_master_id;
  const unitSelector = document.getElementById("unitSelector");
  unitSelector.innerHTML = "";
  const response = await fetch(
    `https://staging.thirdeyegfx.in/kpi_app/get_all_uom/all/${tok}`,
    {
      method: "GET",
    }
  );
  const uomData = await response.json();
  // console.log(uomData.uom);
  uomData.uom.map((uom) => {
    const option = document.createElement("option");
    option.value = uom.id;
    option.text = uom.uom;
    document.getElementById("unitSelector").appendChild(option);
  });
}

function handleDownloadClick(data) {
  // console.log(data);
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

async function handleKpiNUmberModal(data) {
  const departmentData = JSON.parse(data);
  console.log(departmentData);

  const response = await fetch(
    `https://staging.thirdeyegfx.in/kpi_app/get_one_department_kpi/${departmentData.dept_master_id}/${tok}`,
    {
      method: "GET",
    }
  );

  const kpiData = await response.json();
  console.log(kpiData);

  let tableBody = document.getElementsByClassName("modal-kpiNumber-body");

  tableBody[0].innerHTML = `${kpiData.department_kpis
    .map(
      (kpi, index) =>
        `<div class="kpiModelBody" onclick='handlekpinumbermodal(${JSON.stringify(
          kpi
        )})' data-bs-toggle="modal" data-bs-target="#editKpi">
       <h6>KPI ${index + 1}</h6>
       <p>${kpi.kpis}</p>
     </div>`
    )
    .join("")}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const tok = localStorage.getItem("authToken");
  fetchdetails(tok);
});

async function toggleStatus(customerId, newStatus) {
  const form = new FormData();
  form.append("id", customerId);
  form.append("app_status", newStatus);
  form.append("token", tok);

  fetch(
    "https://staging.thirdeyegfx.in/kpi_app/department/toggle_approval_status",
    {
      method: "POST",
      body: form,
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // reload the page
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating status:", error);
    });
}

// form data from assingning modal

document.addEventListener("DOMContentLoaded", () => {
  const saveButton = document.querySelector(
    "#assignModal .modal-footer button"
  );

  saveButton.addEventListener("click", () => {
    const KPIName = document.querySelector("#KPIName").value;
    const unitOfMeasurement = document.querySelector("#unitSelector").value;
    const baselineStat = document.querySelector("#baselineStat").value;

    const target5 = document.querySelector("#target5").value;
    const target4 = document.querySelector("#target4").value;
    const target3 = document.querySelector("#target3").value;
    const target2 = document.querySelector("#target2").value;
    const target1 = document.querySelector("#target1").value;

    const data = {
      KPIName,
      unitOfMeasurement,
      baselineStat,
      targets: {
        "5-Year": target5,
        "4-Year": target4,
        "3-Year": target3,
        "2-Year": target2,
        "1-Year": target1,
      },
    };

    // console.log(data);
    console.log(deptId);

    postAssignData(data, deptId);
  });
});

async function postAssignData(data, deptId) {
  const form = new FormData();
  form.append("department_name_id", deptId);
  form.append("kpis", data.KPIName);
  form.append("uom_master_id", data.unitOfMeasurement);
  form.append("baseline_Status", data.baselineStat);
  form.append("t1", data.targets["1-Year"]);
  form.append("t2", data.targets["2-Year"]);
  form.append("t3", data.targets["3-Year"]);
  form.append("t4", data.targets["4-Year"]);
  form.append("t5", data.targets["5-Year"]);
  form.append("token", tok);

  // console.log(Object.fromEntries(form.entries()));

  fetch("https://staging.thirdeyegfx.in/kpi_app/add_department_kpi", {
    method: "POST",
    body: form,
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

async function handlekpinumbermodal(kpi) {
  console.log(kpi);

  const btn = document.getElementById("kpiEditButton");
  const kpiEditInput = document.getElementById("kpiEditInput");

  kpiEditInput.value = kpi.kpis;

  btn.addEventListener("click", () => {
    const updatedKpiValue = kpiEditInput.value;

    const form = new FormData();
    form.append("id", kpi.id);
    form.append("kpis", updatedKpiValue);
    form.append("token", tok);

    fetch("https://staging.thirdeyegfx.in/kpi_app/admin_update_kpi_name", {
      method: "POST",
      body: form,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // reload the page
        location.reload();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  });
}
