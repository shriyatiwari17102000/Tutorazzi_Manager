import React from 'react';
import classes from "./StatisticsGraph.module.css"
import Chart from 'react-apexcharts';

const StatisticsGraph = () => {
  const series = [
    {
      name: 'Total Revenue',
      data: [400, 300, 200, 278, 189, 239, 349, 450, 550, 300, 400, 500]
    },
    {
      name: "Teacher's share",
      data: [240, 139, 980, 390, 480, 380, 430, 240, 340, 200, 300, 400]
    },
    {
      name: 'Profit',
      data: [210, 139, 200, 190, 480, 880, 430, 270, 340, 800, 900, 400]
    }
  ];

  const options = {
    chart: {
      type: 'area',
      height: 278,
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      labels: {
        formatter: (value) => `₹${value}`
      }
    },
    tooltip: {
      y: {
        formatter: (value) => `₹${value}`
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right'
    },
    fill: {
      opacity: 0.1
    },
    colors: ['#00E396', '#FF4560', "#00488B"],
    markers: {
      size: 0
    },
    grid: {
      borderColor: '#e0e0e0'
    }
  };

  return (
    <div className={classes.statisticschartcard}>
      {/* <div className={classes.header}>
        <h3>Statistics</h3>
        <p>Revenue and Sales</p>
      </div> */}
      <Chart options={options} series={series} type="area" height={278} />
    </div>
  );
};

export default StatisticsGraph;
