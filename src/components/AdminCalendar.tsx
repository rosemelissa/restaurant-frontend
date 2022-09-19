import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import IBookingsData from "../utils/interfaces";
import OneBookingCalendarDisplay from "./OneBookingCalendarDisplay";

function AdminCalendar(): JSX.Element {
    const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
    const [bookingsData, setBookingsData] = useState<IBookingsData[]|null>(null);
    const allTimes = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'];

    useEffect(() => {
        const getBookingsData = async () => {
            const res = await axios.get(`${baseUrl}/bookingsdata/${date}`);
            setBookingsData(res.data);
        }
        getBookingsData();
    }, [date])
    return (
        <>
        <p>Admin calendar</p>
        <label htmlFor="calendar-date">Pick a date</label>
        <input type="date" id="calendar-date" value={date} onChange={(e) => setDate(e.target.value)}/>
        <div className="calendar-grid">
            {allTimes.map((time, i) => {
                return(
                    <p className={`time-label time-${time.replace(":", "")}`} key={i}>{time}</p>
                )
            })}
        {bookingsData && bookingsData.map((booking, i) => {
            return(
                <OneBookingCalendarDisplay key={i} booking={booking}/>
            )
        })}
        </div>
        </>
    )
}

export default AdminCalendar;