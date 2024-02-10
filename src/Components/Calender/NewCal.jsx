// src/newCal.js
import React, { useState } from 'react';
import classes from './NewCal.module.css';
import Container from '../../UI/Container/Container';

const NewCal = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    // Helper function to get the current month and year
    const getCurrentMonthYear = () => {
        const currentDate = new Date();
        return {
            month: currentDate.getMonth(),
            year: currentDate.getFullYear()
        };
    };

    const [currentMonthYear, setCurrentMonthYear] = useState(getCurrentMonthYear());

    const handlePrevMonth = () => {
        setCurrentMonthYear((prev) => {
            const prevMonth = prev.month - 1;
            const prevYear = prev.year;

            if (prevMonth < 0) {
                return { month: 11, year: prevYear - 1 };
            } else {
                return { month: prevMonth, year: prevYear };
            }
        });
    };

    const handleNextMonth = () => {
        setCurrentMonthYear((prev) => {
            const nextMonth = prev.month + 1;
            const nextYear = prev.year;

            if (nextMonth > 11) {
                return { month: 0, year: nextYear + 1 };
            } else {
                return { month: nextMonth, year: nextYear };
            }
        });
    };

    const handleDateClick = (day) => {
        console.log(day);
        setSelectedDate(new Date(currentMonthYear.year, currentMonthYear.month, day));
    };

    // Helper function to generate days of the current month
    const generateDays = (eventDate) => {
        const days = [];
        const firstDay = new Date(currentMonthYear.year, currentMonthYear.month, 1);
        const lastDay = new Date(currentMonthYear.year, currentMonthYear.month + 1, 0);


        for (let day = 1; day <= lastDay.getDate(); day++) {
            const currentDate = new Date(currentMonthYear.year, currentMonthYear.month, day);
            const isCurrentMonth = currentDate >= firstDay && currentDate <= lastDay;
            days.push(
                <div
                    key={day}
                    className={`${classes.day} ${isCurrentMonth ? classes.current_month : classes.other_month} ${selectedDate && currentDate.toDateString() === selectedDate.toDateString() ? classes.selected : ''}`}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };



    return (
        <Container cls={classes.calendar_container}>
            <div className={classes.calendar_header}>
                <button onClick={handlePrevMonth}>&lt;</button>
                <h2>{new Date(currentMonthYear.year, currentMonthYear.month).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className={classes.calendar}>
                <div className={classes.weekdays}>
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                </div>
                <div className={classes.days}>{generateDays()}</div>
            </div>
            {selectedDate && (
                <div className="selected-date">
                    <h3>Selected Date:</h3>
                    <p>{selectedDate.toDateString()}</p>
                </div>
            )}
        </Container>
    );
};

export default NewCal;
