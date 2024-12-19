

// chart js 

document.addEventListener("DOMContentLoaded", function () {

  const ctx = document.getElementById("myChart");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Baseline Target", "Current Status", "5 Year Goal"],
      datasets: [
        {
          label: "KPI",
          data: [18, 13, 3],
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


  const ctx1 = document.getElementById("myChart1");
  new Chart(ctx1, {
    type: "bar",
    data: {
      labels: ["Baseline Target", "Current Status", "5 Year Goal"],
      datasets: [
        {
          label: "KPI",
          data: [12, 19, 3],
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

   const ctx2 = document.getElementById("myChart2");
   new Chart(ctx2, {
     type: "bar",
     data: {
       labels: ["Baseline Target", "Current Status", "5 Year Goal"],
       datasets: [
         {
           label: "KPI",
           data: [1200, 190, 300],
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

