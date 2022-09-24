import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import getNextSevenDays from "../utils/getNextSevenDays";

function AdminCovers(): JSX.Element {
  const [date, setDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  // const [sevenDays, setSevenDays] = useState<string[]>(getNextSevenDays(new Date().toISOString().substring(0, 10)))
  const [covers, setCovers] = useState<
    { date: string; total_covers: number }[]
  >([]);
  useEffect(() => {
    const getCovers = async () => {
      const res = await axios.get(`${baseUrl}/covers/${date}`);
      const datesWithCovers: { date: string; total_covers: number }[] =
        res.data;
      const allDatesCovers: { date: string; total_covers: number }[] = [];
      const sevenDays = getNextSevenDays(date);
      console.log("seven days", sevenDays);
      for (let i = 0; i < 7; i++) {
        let dateAdded = false;
        for (const dateWithCover of datesWithCovers) {
          if (!dateAdded && dateWithCover.date === sevenDays[i]) {
            allDatesCovers.push(dateWithCover);
            dateAdded = true;
          }
        }
        if (!dateAdded) {
          allDatesCovers.push({ date: sevenDays[i], total_covers: 0 });
        }
      }
      setCovers(allDatesCovers);
    };
    // setSevenDays(getNextSevenDays(date))
    getCovers();
  }, [date]);
  return (
    <>
      <Link to="/admin-tools" className="orange-button top-left-button">
        Admin Tools
      </Link>
      <div id="covers-and-input">
        <h2>Covers</h2>
        <p>View covers for next 7 days</p>
        <label htmlFor="date-select">Select date</label>
        <input
          type="date"
          id="date-select"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="covers-grid">
          <p className="cover-date label">Date</p>
          <p className="cover-number label">Number of people</p>
          {covers.map((cover, i) => {
            return (
              <>
                <p className={`cover-date cover-${i}`}>{cover.date}</p>
                <p className={`cover-number cover-${i}`}>
                  {cover.total_covers}
                </p>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AdminCovers;
