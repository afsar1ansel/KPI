const { AgCharts } = agCharts;



const options = {
  container: document.getElementById("myChart"),
  title: {
    text: "KPI 1",
    color: "#0F6609",
    border: "1px solid #0F6609",
  },
  data: [
    {
      base_line: 2.3,
      current_status: 6.3,
      five_year_goal: 16.2,
      target: "score",
      targetCurrect: "Current Status",
      targetFiveYear: "5-Year Goal",
    },
  ],
  series: [
    {
      type: "bar",
      xKey: "target",
      yKey: "base_line",
      yName: "Baseline Target",
      fill: "#FFD599",
      
    },
    {
      type: "bar",
      xKey: "target",
      yKey: "current_status",
      yName: "currect status",
      fill: "#5FA777",
    },
    {
      type: "bar",
      xKey: "target",
      yKey: "five_year_goal",
      yName: "5 year goal",
      fill: "#0F6609",
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
      title: {
        text: "Target achieved",
        color: "#0F6609",
      },
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "Scale (Lakh Hectares)",
        color: "#0F6609",
      },
    },
  ],
};

// Chart Options for the second chart
const options1 = {
  container: document.getElementById("myChart1"),
  title: {
    text: "KPI 2",
  },
  data: [
    { target: "Baseline Target", scale: 2.3 },
    { target: "Current Status", scale: 6.3 },
    { target: "5-Year Goal", scale: 16.2 },
  ],
  series: [
    {
      type: "bar",
      xKey: "target",
      yKey: "scale",
      yName: "Scale (Lakh Hectares)",
      fill: "#FFD599",
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
      title: {
        text: "Target achieved",
        color: "#0F6609",
      },
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "Scale (Lakh Hectares)",
        color: "#0F6609",
      },
    },
  ],
};


const options2 = {
  container: document.getElementById("myChart2"),
  title: {
    text: "KPI 2",
  },
  data: [
    { target: "Baseline Target", scale: 2.3 },
    { target: "Current Status", scale: 6.3 },
    { target: "5-Year Goal", scale: 16.2 },
  ],
  series: [
    {
      type: "bar",
      xKey: "target",
      yKey: "scale",
      yName: "Scale (Lakh Hectares)",
      fill: (param) => {
        console.log({ param });
      },
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
      title: {
        text: "Target achieved",
        color: "#0F6609",
      },
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "Scale (Lakh Hectares)",
        color: "#0F6609",
      },
    },
  ],
};

// Create the first chart
AgCharts.create(options);

// Create the second chart
AgCharts.create(options1);

AgCharts.create(options2);

