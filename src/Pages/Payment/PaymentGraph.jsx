
// import React from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// const PaymentGraph = (props) => {
//   console.log(props.graphData);
  
  // const data = props?.graphData?.map(item => ({
  //   date: item.month.slice(0,3), 
  //   amount: item.amount,
  // }));
//   console.log(data)

//   return (
//     <ResponsiveContainer width="100%" height={400} style={{padding:"10px 10px 0 20px"}}>
//       <BarChart data={data}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="date" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="amount" fill="#8884d8" />
//       </BarChart> 
   
//     </ResponsiveContainer>
//   );
// };

// export default PaymentGraph;


// import React, { useState } from 'react';
// import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// const PaymentGraph = (props) => {

//   const [graphData, setGraphData] = useState([]);
//   const data = props?.graphData?.map(item => ({
//     date: item.month.slice(0,3), 
//     amount: "₹" + item.amount,
//   }));
//   console.log(data)
//   const handleYearChange = (event) => {
//     props?.setSelectedYear(event.target.value);
//   };

 
// console.log(props?.years)
//   const filteredData = data?.filter(item => console.log(item));
//   // const filteredData = data?.filter(item => item?._id === props?.selectedYear) // Filter data based on selected year
//   //   .map(item => ({
//   //     date: item?.month?.slice(0, 3),
//   //     amount: item?.amount,
//   //   }));
//     console.log(filteredData)

//   return (
//     <div>
//       <div style={{ marginBottom: '20px' }}>
//         <label htmlFor="year">Select Year: </label>
//         <select id="year" value={props?.selectedYear} onChange={handleYearChange}>
//         {props?.years?.length > 0 && props?.years?.map(year => (
//             <option key={year._id} value={year._id}>{year._id}</option>
//           ))}
//         </select>
//       </div>

//       <ResponsiveContainer width="100%" height={400} style={{ padding: "10px 10px 0 20px" }}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="amount" fill="#8884d8" />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default PaymentGraph;

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import classes from "./Payment.module.css"
const PaymentGraph = (props) => {
  const handleYearChange = (event) => {
    props.setSelectedYear(event.target.value);
  };

  const data = props.graphData?.map(item => ({
    date: item.month.slice(0, 3),
    amount: item.amount,
  }));

  return (
    <div>
      <div style={{ marginBottom: '20px', display:"flex", alignItems:"center", justifyContent:"end", gap:"10px", marginRight:"30px" }} className={classes.main_div}>
        <label htmlFor="year">Select Year: </label>
        <select id="year" value={props.selectedYear} onChange={handleYearChange}>
          {props.years?.length > 0 && props.years.map(year => (
            <option key={year._id} value={year._id}>{year._id}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400} style={{ padding: "10px 10px 0 20px" }}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" /> {/* Bars colored red */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaymentGraph;


