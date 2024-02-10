import React, { useState } from 'react'
import Container from '../../UI/Container/Container'
import classes from './ListCalendar.module.css'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import ClassCardContainer from '../../UI/ClassCardContainer/ClassCardContainer';
import { Link } from 'react-router-dom';
import img from '../../assets/add-square-03.png'
import RescheduleModal from '../AllModals/RescheduleModal/RescheduleModal';
const ListCalendar = () => {

    const [popup,setPopup] = useState(false)

    const timeArr = [
        '10:00 AM',
        '10:30 AM',
        '11:00 AM',
        '11:30 AM',
        '12:00 AM',
        '12:30 PM',
        '01:00 PM',
        '01:30 PM',
        '02:00 PM',
        '02:30 PM',
        '03:00 PM',
        '03:30 PM',
    ]

    const dataArr = [
        {
            id: '1',
            initial_time: '10:30 AM',
            title: 'Maths Class',
            agenda: 'Complete calculas last exercise',
            timing: '10:30 AM to 11:00 AM'
        }
    ]

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
        alert(new Date(currentMonthYear.year, currentMonthYear.month, day));
        setSelectedDate(new Date(currentMonthYear.year, currentMonthYear.month, day));
    };

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

    const setPopFunction = () => {
        setPopup(true)
    }

    return (
        <Container cls={classes.container}>

            <h2 className={classes.heading}>{new Date(currentMonthYear.year, currentMonthYear.month).toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>


            <div className={classes.calendar_header}>

                <button onClick={handlePrevMonth} ><FiChevronLeft /></button>

                <div className={classes.calendar}>
                    <div className={classes.days}>{generateDays()}</div>
                </div>

                <button onClick={handleNextMonth}  ><FiChevronRight /></button>

            </div>

            <div className={classes.events_container}>
                {timeArr.map((element) => (
                    dataArr.map((item, index) => (
                        <div key={index} className={classes.event_div} onClick={setPopFunction}>
                            <span>{element}</span>

                            {
                                element === item.initial_time ?
                                    <div style={{ background: '#ffe8e8' }}>
                                        <h3>{item.title}</h3>
                                        <h3>{item.agenda}</h3>
                                        <div>
                                            <h3>{item.timing}</h3>
                                            <Link to={'/'}>Details</Link>
                                        </div>
                                    </div> : <div className={classes.hoverable_div}>
                                        <img src={img} alt="" />
                                    </div>
                            }
                        </div>
                    ))
                ))}
                {/* <div className={classes.event_div}>
                    <span>10:00 AM</span>
                    <div style={{background:'#ffe8e8'}}>
                        <h3>Heading</h3>
                        <h3>Agenda : Complete Maths Chapter 1</h3>
                        <div>
                            <h3>10:00 AM - 10:30 AM</h3>
                            <Link to={'/'}>Details</Link>
                        </div>
                    </div>
                </div>
                <div className={classes.event_div}>
                    <span>10:30 AM</span>
                    <div>

                    </div>
                </div>
                <div className={classes.event_div}>
                    <span>11:00 AM</span>
                    <div>

                    </div>
                </div> */}
            </div>

            {/* Reschedule Modal */}
            <RescheduleModal isPopup={popup} popupFunc={setPopup} /> 

        </Container>
    )
}

export default ListCalendar