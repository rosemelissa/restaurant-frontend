import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";

function MakeBooking(): JSX.Element {
    const [firstname, setFirstname] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mailingList, setMailingList] = useState<boolean>(false);
    const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
    const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
    const [possibleTimes, setPossibleTimes] = useState<string[]|null>(null)
    const [time, setTime] = useState<string|null>(null);
    const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

    useEffect(() => {
        if (!bookingSubmitted) {
            getPossibleTimes(date, numberOfPeople);
        }
    }, [bookingSubmitted])

    const getPossibleTimes = async (selectedDate: string, selectedNumberOfPeople: number) => {
        const res = await axios.get(`${baseUrl}/possibletimes/${selectedDate}/${selectedNumberOfPeople}`);
        setPossibleTimes(res.data);
        setTime(null);

        //get all bookings on selected date with table capacity >= group size
        /*
        const possTimes = [17:00, 17:30, ...22:00]
        for each booking time
            delete that time and next 2 times
        see if there are any free slots of 1.5 hours left
        return the start times in an array = setPossibleTimes

        */
    }

    const handleSubmit = async () => {
        const body = {
            firstname,
            surname,
            email,
            // email: validateEmail(email),
            mailingList,
            numberOfPeople,
            date,
            time,
        }
        await axios.post(`${baseUrl}/newbooking`, body);
        setBookingSubmitted(true);
    }

    const startNewBooking = () => {
        setFirstname("");
        setSurname("");
        setEmail("");
        setMailingList(false);
        setNumberOfPeople(2);
        setDate(new Date().toISOString().substring(0, 10));
        setPossibleTimes(null);
        setTime(null);
        setBookingSubmitted(false);
    }

    if (bookingSubmitted) {
        return (
            <>
                <h2>Booking confirmation</h2>
                <p>A confirmation email has been sent to: {email}</p>
                <p onClick={startNewBooking}>Make a new booking</p>
                <Link to="/">Home</Link>
            </>
        )
    } else {
    return (
        <>
        <p>Make a booking</p>
        <label htmlFor="firstname">First name</label>
        <input id="firstname" type="text" placeholder="Enter your first name" value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
        <label htmlFor="surname">Surname</label>
        <input id="surname" type="text" placeholder="Enter your surname" value={surname} onChange={(e) => setSurname(e.target.value)}/>
        <label htmlFor="email">Email address</label>
        <input id="email" type="text" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <p>
            Join our mailing list?
            {mailingList ? (
              <input
                type="checkbox"
                defaultChecked
                onClick={() => setMailingList(false)}
              />
            ) : (
              <input type="checkbox" onClick={() => setMailingList(true)} />
            )}
          </p>
          <label htmlFor="date">Choose a date:</label>
        <input type="date" id="date" min={new Date().toISOString().substring(0, 10)} value={date} onChange={(e) => {setDate(e.target.value); getPossibleTimes(e.target.value, numberOfPeople)}}/>
        <label htmlFor="number-of-people">Group size (max 10):</label>
        <select id="number-of-people" onChange={(e) => {setNumberOfPeople(parseInt(e.target.value)); getPossibleTimes(date, parseInt(e.target.value))}}>
            <option>1</option>
            <option selected>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </select>

        <label htmlFor="time">Choose a time:</label>
        {possibleTimes ?
        <>
        <select id="time" onChange={(e) => {setTime(e.target.value)}}>
        <option disabled selected> -- select an option -- </option>
                {possibleTimes.map((possibleTime, i) => {
                    return (
                        <option key={i} value={possibleTime}>{possibleTime}</option>
                    )
                })}
        </select>
        {time && <button type="button" onClick={handleSubmit}>Submit</button>}
        </>
            :
            <>
            <p>No times available, try a different date/group size</p>
            </>}
    </>
    )
            }
}

export default MakeBooking;