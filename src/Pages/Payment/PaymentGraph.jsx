
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const PaymentGraph = (props) => {
  console.log(props.graphData);
  
  const data = props?.graphData?.map(item => ({
    date: item.month.slice(0,3),  // Assuming 'id' is the date property
    amount: item.amount,
  }));
  console.log(data)

  return (
    <ResponsiveContainer width="100%" height={400} style={{padding:"10px 10px 0 20px"}}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart> 
   
    </ResponsiveContainer>
  );
};

export default PaymentGraph;