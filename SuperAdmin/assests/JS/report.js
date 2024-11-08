const { AgCharts } = agCharts;

const options = {
  container: document.getElementById("myChart"),
  title: {
    text: "KPI 1",
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
      fill: ["#FFD599", "#90EE90", "#0F6609"],
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
      title: {
        text: "Target achieved",
      },
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "Scale (Lakh Hectares)",
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
      },
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "Scale (Lakh Hectares)",
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
      fill: "#FFD599",
    },
  ],
  axes: [
    {
      type: "category",
      position: "bottom",
      title: {
        text: "Target achieved",
      },
    },
    {
      type: "number",
      position: "left",
      title: {
        text: "Scale (Lakh Hectares)",
      },
    },
  ],
};

// Create the first chart
AgCharts.create(options);

// Create the second chart
AgCharts.create(options1);

AgCharts.create(options2);

