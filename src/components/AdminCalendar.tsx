import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import IBookingsData from "../utils/interfaces";
import OneBookingCalendarDisplay from "./OneBookingCalendarDisplay";

function AdminCalendar(): JSX.Element {
    const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
    const [bookingsData, setBookingsData] = useState<IBookingsData[]|null>(null);
    const allTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];
    const allTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    useEffect(() => {
        const getBookingsData = async () => {
            const res = await axios.get(`${baseUrl}/bookingsdata/${date}`);
            setBookingsData(res.data);
        }
        getBookingsData();
    }, [date])
    return (
        <>
        <Link to="/admin-tools" className='orange-button top-left-button'>Admin Tools</Link>
        <div id='calendar-and-input'>
        <h2>Calendar</h2>
        <label htmlFor="calendar-date">Pick a date</label>
        <input type="date" id="calendar-date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <div className="calendar-grid">
            {allTables.map((table, i) => {
                return (
                    <>
                    <p className={`table-label table-${table}`}>Table {table}</p>
                    <div className={`table-line table-${table}`}></div>
                    </>
                )
            })}
            {allTimes.map((time, i) => {
                return(
                    <>
                    <p className={`time-label time-${time.replace(":", "")}`}>{time}</p>
                    <div className={`time-line time-${time.replace(":", "")}`}></div>
                    </>
                )
            })}
        {bookingsData && bookingsData.map((booking, i) => {
            return(
                <OneBookingCalendarDisplay key={i} booking={booking}/>
            )
        })}
        </div>
        </div>
        </>
    )
}

export default AdminCalendar;