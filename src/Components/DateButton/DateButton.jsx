import React, { useState } from "react";
import DatePicker from "react-datepicker";
import './DateButton.css'
import "react-datepicker/dist/react-datepicker.css";

const DateButton = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    );
}

export default DateButton
