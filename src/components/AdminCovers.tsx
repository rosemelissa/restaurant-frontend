import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import getNextSevenDays from "../utils/getNextSevenDays";

function AdminCovers(): JSX.Element {
    const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
    // const [sevenDays, setSevenDays] = useState<string[]>(getNextSevenDays(new Date().toISOString().substring(0, 10)))
    const [covers, setCovers] = useState<{date: string, total_covers: number}[]|null>(null)
    useEffect(() => {
        const getCovers = async () => {
            const res = await axios.get(`${baseUrl}/covers/${date}`);
            const datesWithCovers: {date: string, total_covers: number}[] = res.data;
            const allDatesCovers: {date: string, total_covers: number}[] = [];
            const sevenDays = getNextSevenDays(date);
            console.log('seven days', sevenDays)
            for (let i=0; i<7; i++) {
                let dateAdded = false;
                for (const dateWithCover of datesWithCovers) {
                    if (!dateAdded && (dateWithCover.date === sevenDays[i])) {
                        allDatesCovers.push(dateWithCover);
                        dateAdded = true;
                    }
                }
                if (!dateAdded) {
                    allDatesCovers.push({date: sevenDays[i], total_covers: 0})
                }
            }
            setCovers(allDatesCovers);
        }
        // setSevenDays(getNextSevenDays(date))
        getCovers();
    }, [date])
    return (
        <>
        <p>Admin covers</p>
        <p>View covers for next 7 days</p>
        <label htmlFor="date-select">Select date</label>
        <input type="date" id="date-select" value={date} onChange={(e) => setDate(e.target.value)}/>
        {covers &&
            covers.map((cover, i) => {
                return (
                    <div key={i}>
                    <p>Date: {cover.date}</p>
                    <p>Number of people: {cover.total_covers}</p>
                    </div>
                )
            })
        }
        </>
    )
}

export default AdminCovers;