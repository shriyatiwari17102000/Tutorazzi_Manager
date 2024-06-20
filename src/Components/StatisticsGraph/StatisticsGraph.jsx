import React, { useState } from 'react';
import classes from "./StatisticsGraph.module.css"
import Chart from 'react-apexcharts';
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';  

const StatisticsGraph = ({data, dependTime, setDependTime}) => {
  let graphData = data?.graphDataArray
  const [value, onChange] = useState('');
  const { graphDataArray, totalArray, teacherArray, profitArray } = data;

  const series = [
    {
      name: 'Total Revenue',
      data: totalArray
    },
    {
      name: "Teacher's share",
      data: teacherArray
    },
    {
      name: 'Profit',
      data: profitArray
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
      categories: graphDataArray
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
      <div className={classes.header}>
        <h3>Revenue</h3>
        <select  className={classes.choose_date} value={dependTime} onChange={(e)=> setDependTime(e.target.value)} >
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="half_yearly">Half Yearly</option>
          <option value="yearly">Yearly</option>
        </select>

      </div>
      <Chart options={options} series={series} type="area" height={278} />
      <div className={classes.tag}>
        <p>Total Revenue &nbsp; ₹{data?.totalRevenue}</p>
        <p>Teacher's Share &nbsp;₹{data?.payout}</p>
        <p>Profit &nbsp;₹{data?.profit}</p>
      </div>
    </div>
  );
};

export default StatisticsGraph;
