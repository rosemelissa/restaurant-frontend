import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";

function AdminCovers(): JSX.Element {
    const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
    const [covers, setCovers] = useState<{date: string, total_covers: number}[]|null>(null)
    useEffect(() => {
        const getCovers = async () => {
            const res = await axios.get(`${baseUrl}/covers/${date}`);
            setCovers(res.data);
        }
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
                    <>
                    <p>Date: {cover.date}</p>
                    <p>Number of people: {cover.total_covers}</p>
                    </>
                )
            })
        }
        </>
    )
}

export default AdminCovers;