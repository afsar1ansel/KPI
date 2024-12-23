 
let dataObj;
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

  // console.log(Object.fromEntries(form));
  dataObj = form;

  try {
    const response = await fetch(
      `https://staging.thirdeyegfx.in/kpi_app/get_dept_report`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await response.json();
    // console.log(data);

    setReportData(data.department_report,form);
  } catch (error) {
    console.error("Error filtering data:", error);
  }
}

function setReportData(data,form) {
  console.log(data);
 console.log(Object.fromEntries(form));
//  console.log(form.min_year,form.max_year);
  // table date
   const time = document.getElementById("table_dateData");
   time.innerHTML = "";
   const fromT = form.get("min_year");
   const toT = form.get("max_year");
   console.log(fromT,toT);
   time.innerHTML = `${fromT} to ${toT}`;

  const name = document.getElementById("DepartmentName");
  name.innerHTML = "";
  name.innerHTML = data.department_name

  const div = document.getElementById("kpidetailBox");
  div.innerHTML = "";
  //  const div = document.getElementById("kpidetailBox");
  data.all_kpis.forEach((item) => {
    const t1 = formatDateful(item.created_at);
    const t2 = formatDateful(item.created_at);
    console.log(item);
    const box = document.createElement("div");
    box.classList.add("kpicardsDiv");

    box.innerHTML = `<div class="kpidetailBox1">
              <div class="kpiDetailHeader">Kpi 1</div>
              <div class="kpiNameDate">
                <h3 class="kpiName">${item.kpis}</h3>
                <p id="Cardtime">created at:${t1} | Updated at:${t2}</p>
              </div>
              <div class="kpiBoxline"></div>
              <div class="kpiBigStats" id="kpiStats">
                <div class="kpiStats" >
                <h2 class="big_cardStats">${item.baseline_status} ${item.unit_of_measurement}</h2>
                <p> Baseline State</p>
                </div>
                <div class="horizontalLine"></div>
                <div class="kpiStats">
                <h2 class="big_cardStats">${item.current_status} ${item.unit_of_measurement}</h2>
                <p> Current State</p>
                </div>
                <div class="horizontalLine"></div>
                <div class="kpiStats">
                <h2 class="big_cardStats">${item.next_year_target} ${item.unit_of_measurement}</h2>
                <p> Next year target</p>
                </div>
                <div class="horizontalLine"></div>
                <div class="kpiStats">
                <h2 class="big_cardStats">${item.t5} ${item.unit_of_measurement}</h2>
                <p>5 years Target</p>
                </div>
              </div>

            </div>
             <div class="kpidetailBox2">
              <div class="kpiDetail2boxes">
                <div class="kpiDetailHeader">${item.y1_year}</div>
                <h3>${item.y1}</h3>
                <p> Target achieved</p>
              </div>

               <div class="kpiDetail2boxes">
                <div class="kpiDetailHeader">${item.y2_year}</div>
                <h3>${item.y2}</h3>
                <p> Target achieved</p>
              </div>

               <div class="kpiDetail2boxes">
                <div class="kpiDetailHeader">${item.y3_year}</div>
                <h3>${item.y3}</h3>
                <p> Target achieved</p>
              </div>

               <div class="kpiDetail2boxes">
                <div class="kpiDetailHeader">${item.y4_year}</div>
                <h3>${item.y4}</h3>
                <p> Target achieved</p>
              </div>
            </div>`;

    div.appendChild(box);
  });

  graphSet(data);
}
  
  // graphSet();

function graphSet(data) {
  console.log(data);
  const graphData = data.all_kpis;

  const box = document.getElementById("graphbox");
  box.innerHTML = "";

  graphData.forEach((item, index) => {
    console.log(index)

    const boxG = document.createElement("div");
    boxG.innerHTML = "";
    boxG.classList.add("graph_boxG");

    boxG.innerHTML = `<div class="chart-container">
              <div class="chart-title">KPI ${index + 1}</div>
              <div class="chart-row">
                <div class="vertical-label">LAKH HECTARES</div>
                <canvas id="myChart${index + 1}" height="200"></canvas>
              </div>
              <div class="graphBase-label">TARGET ACHIEVED</div>
            </div>`;

    box.appendChild(boxG);


    const ctx = document.getElementById(`myChart${index + 1}`);
   new Chart(ctx, {
     type: "bar",
     data: {
       labels: ["year 1", "year 2", "year 3", "year 4", "year 5"],
       datasets: [
         {
           label: "KPI",
           data: [item.y1, item.y2, item.y3, item.y4, item.y5],
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
  });

}




// chart js

document.addEventListener("DOMContentLoaded", function () {
  // const ctx = document.getElementById("myChart1");
  // new Chart(ctx, {
  //   type: "bar",
  //   data: {
  //     labels: ["Baseline Target", "Current Status", "5 Year Goal"],
  //     datasets: [
  //       {
  //         label: "KPI",
  //         data: [18, 13, 3],
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


function formatDate(dateString) {
  const date = new Date(dateString); // Parse the date string
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-based) and pad
  const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
 
  return `${year}`;
}

function formatDateful(dateString) {
  const date = new Date(dateString); // Parse the date string
  const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-based) and pad
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;

  // return `${year}`;
}


// download 

const btn = document.getElementById("downloadButton");

btn.addEventListener("click", function () {
  console.log("Download button clicked");

downloadFetch();
})

async function downloadFetch() {

  console.log(Object.fromEntries(dataObj))

  try{
    const response = await fetch(`https://staging.thirdeyegfx.in/kpi_app/get_dept_report_pdf`, {
      method: "POST",
      body: dataObj,
    })

    const data = await response.blob();
    const url = URL.createObjectURL(data);
    const a = document.createElement("a");
    a.href = url;
    a.download = "report.pdf";
    a.click();

  }catch(error){
    console.log(error)
  }
}