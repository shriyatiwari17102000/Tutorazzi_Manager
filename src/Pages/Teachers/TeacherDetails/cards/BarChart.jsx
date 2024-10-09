// import React, { useState } from 'react';
// import Chart from 'react-apexcharts';

// const BarChart = () => {
//   const [chartData] = useState({
//     series: [
//       {
//         name: 'Earnings',
//         data: [22300, 362, 21980, 43007, 39950, 11795], // Earnings for Jan to Jun
//       },
//     ],
//     options: {
//       chart: {
//         type: 'bar',
//         height: 350,
//       },
//       plotOptions: {
//         bar: {
//           borderRadius: 5,
//           columnWidth: '50%',
//         },
//       },
//       dataLabels: {
//         enabled: true,
//       },
//       xaxis: {
//         title: {
//               text: 'Earnings',
//             },
//         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // Months
//       },
//       yaxis: {
//         // title: {
//         //   text: 'Earnings (USD)',
//         // },
//         labels: {
//           formatter: (val) => Math.round(val),
//         },
//       },
//       fill: {
//         colors: ['#8979FF'],
//       },
//       title: {
//         text: 'Earning last 6 months',
//         align: 'left',
//         style: {
//             fontSize: '16px',  // Set the font size
//             fontWeight: '500', // Set the font weight
//             color : "black"
//           },
        
//       },
//       grid: {
//         strokeDashArray: 5,
//       },
//       tooltip: {
//         y: {
//           formatter: (val) => `$${val}`,
//         },
//       },
//     },
//   });

//   return (
//     <div className="chart">
//       <Chart
//         options={chartData.options}
//         series={chartData.series}
//         type="bar"
//         height={350}
//       />
//     </div>
//   );
// };

// export default BarChart;
import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const BarChart = ({ newArray }) => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Earnings',
        data: [], // Initially empty
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        title: {
          text: 'Earnings',
        },
        categories: [], // Initially empty
      },
      yaxis: {
        labels: {
          formatter: (val) => Math.round(val),
        },
      },
      fill: {
        colors: ['#8979FF'],
      },
      title: {
        text: 'Earnings Over Last 6 Months',
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: '500',
          color: 'black',
        },
      },
      grid: {
        strokeDashArray: 5,
      },
      tooltip: {
        y: {
          formatter: (val) => `$${val}`,
        },
      },
    },
  });

  useEffect(() => {
    if (newArray) {
      // Extract data for the chart
      const categories = newArray.map(item => item.day);
      const data = newArray.map(item => parseFloat(item.totalTeacherPayouts));

      // Update chartData state
      setChartData(prevState => ({
        ...prevState,
        series: [
          {
            ...prevState.series[0],
            data: data,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            ...prevState.options.xaxis,
            categories: categories,
          },
        },
      }));
    }
  }, [newArray]);

  return (
    <div className="chart">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default BarChart;
