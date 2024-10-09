// import React, { useState } from 'react';
// import Chart from 'react-apexcharts';

// const PieChart = () => {
//   const [chartData] = useState({
//     series: [90, 10], // Overall: 90%, Teacher's cut: 10%
//     options: {
//       chart: {
//         type: 'pie',
//       },
//       labels: ['Overall', "Teacher's cut"], // Labels for pie segments
//       colors: ['#8979FF', '#FF928A'], // Colors: purple for Overall, coral for Teacher's cut
//       legend: {
//         position: 'bottom',
//       },
//       dataLabels: {
//         formatter: (val) => `${val.toFixed(2)}%`,
//       },
//       title: {
//         text: "Revenue Breakdown",
//         align: 'center',
//         style: {
//             fontSize: '16px',  // Set the font size
//             fontWeight: '500', // Set the font weight
//             color : "black"
//           },
//       },
//       tooltip: {
//         y: {
//           formatter: (val) => `${val.toFixed(2)}%`,
//         },
//       },
//     },
//   });

//   return (
//     <div className="chart">
//       <Chart
//         options={chartData.options}
//         series={chartData.series}
//         type="pie"
//         height={350}
//       />
//     </div>
//   );
// };

// export default PieChart;


import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ data }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'pie',
      },
      labels: ['Overall', "Teacher's cut"], // Initial labels without percentages
      colors: ['#8979FF', '#FF928A'],
      legend: {
        position: 'bottom',
      },
      dataLabels: {
        formatter: (val) => `${val.toFixed(2)}%`,
      },
      title: {
        text: "Revenue Breakdown",
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: '500',
          color: 'black',
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `${val.toFixed(2)}%`,
        },
      },
    },
  });

  useEffect(() => {
    if (data) {
      const { totalTeachrPayouts, totalProfit } = data;

      // Calculate the percentage values for the labels
      const overallPercentage = parseFloat(totalProfit).toFixed(2);
      const teachersCutPercentage = parseFloat(totalTeachrPayouts).toFixed(2);

      setChartData((prevData) => ({
        ...prevData,
        series: [parseFloat(totalProfit), parseFloat(totalTeachrPayouts)],
        options: {
          ...prevData.options,
          labels: [`Overall (${overallPercentage}%)`, `Teacher's cut (${teachersCutPercentage}%)`], // Update labels with percentage
        },
      }));
    }
  }, [data]);

  return (
    <div className="chart">
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        height={350}
      />
    </div>
  );
};

export default PieChart;
