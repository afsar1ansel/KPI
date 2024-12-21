let data1 = {
    all_kpis: [
      {
        baseline_status: "30.00",
        created_at: "Tue, 12 Nov 2024 11:11:39 GMT",
        current_status: "null",
        kpi_id: 3,
        kpis: "Analyse 40 more dpartment revenue.",
        next_year_target: "28.10",
        t5: "30.50",
        unit_of_measurement: "Liters",
        updated_at: "Tue, 12 Nov 2024 11:11:39 GMT",
        y1: null,
        y1_year: null,
        y2: null,
        y2_year: null,
        y3: null,
        y3_year: null,
        y4: null,
        y4_year: null,
        y5: null,
        y5_year: null,
      },
      {
        baseline_status: "30.00",
        created_at: "Wed, 06 Nov 2024 12:59:18 GMT",
        current_status: "20.00",
        kpi_id: 2,
        kpis: "updated kpi",
        next_year_target: "28.70",
        t5: "30.50",
        unit_of_measurement: "Liters",
        updated_at: "Wed, 27 Nov 2024 12:36:37 GMT",
        y1: "20.00",
        y1_year: 2022,
        y2: null,
        y2_year: null,
        y3: null,
        y3_year: null,
        y4: null,
        y4_year: null,
        y5: null,
        y5_year: null,
      },
    ],
    most_recent_kpi: {
      baseline_status: "30.00",
      created_at: "Tue, 12 Nov 2024 11:11:39 GMT",
      current_target: "null",
      kpi_id: 3,
      kpis: "Analyse 40 more dpartment revenue.",
      next_year_target: "28.10",
      t5: "30.50",
      unit_of_measurement: "Liters",
      updated_at: "Tue, 12 Nov 2024 11:11:39 GMT",
      y1: null,
      y1_year: null,
      y2: null,
      y2_year: null,
      y3: null,
      y3_year: null,
      y4: null,
      y4_year: null,
      y5: null,
      y5_year: null,
    },
  };
 

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

    setReportData(data.department_report);
  } catch (error) {
    console.error("Error filtering data:", error);
  }
}

function setReportData(data) {
  console.log(data);
  
  // table date
   const time = document.getElementById("table_dateData");
   const fromT = formatDate(data.all_kpis[0].created_at);
   const toT = formatDate(data.all_kpis[0].updated_at);
   time.innerHTML = `${fromT} to ${toT}`;


   const div = document.getElementById("kpidetailBox");
  //  const div = document.getElementById("kpidetailBox");
    data.all_kpis.forEach((item) => {
      // cards
       const box = document.createElement("div");
       box.classList.add("kpicardsDiv");

       box.innerHTML = `<div class="kpidetailBox1">
              <div class="kpiDetailHeader">kpi 1</div>
              <div class="kpiNameDate">
                <h3>name</h3>
                <p>date | date</p>
              </div>
              <div class="kpiBoxline"></div>
              <div class="kpiBigStats">
                <div class="kpiStats">
                <h2>31.50  Unit</h2>
                <p> Baseline State</p>
                </div>
                <div class="horizontalLine"></div>
                <div class="kpiStats">
                <h2>31.50 Unit</h2>
                <p> Current State</p>
                </div>
                <div class="horizontalLine"></div>
                <div class="kpiStats">
                <h2>31.50  measureUnit</h2>
                <p> Next year target</p>
                </div>
                <div class="horizontalLine"></div>
                <div class="kpiStats">
                <h2>31.50  measureUnit</h2>
                <p> Target for next 5 years</p>
                </div>
              </div>

            </div>
             <div class="kpidetailBox2">
              <div class="kpiDetail2boxes">
                <div class="kpiDetailHeader">kpi 1</div>
                <h3>33.20 unit</h3>
                <p> Target achieved</p>
              </div>

               <div class="kpiDetail2boxes">
                <div class="kpiDetailHeader">kpi 1</div>
                <h3>33.20 unit</h3>
                <p> Target achieved</p>
              </div>

               <div class="kpiDetail2boxes">
                <div class="kpiDetailHeader">kpi 1</div>
                <h3>33.20 unit</h3>
                <p> Target achieved</p>
              </div>

               <div class="kpiDetail2boxes">
                <div class="kpiDetailHeader">kpi 1</div>
                <h3>33.20 unit</h3>
                <p> Target achieved</p>
              </div>
            </div>`;

      div.appendChild(box);

    })
   
  graphSet(data);
    
  }
  
  // graphSet();

function graphSet(data) {
  console.log(data);
  const graphData = data.all_kpis;

  const box = document.getElementById("graphbox");

  graphData.forEach((item, index) => {
    console.log(index)

    const boxG = document.createElement("div");
    boxG.classList.add("graph_boxG");

    boxG.innerHTML = `<div class="chart-container">
              <div class="chart-title">KPI 1</div>
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
       labels: ["y1_year", "y2_year", "y3_year", "y4_year", "y5_year"],
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

