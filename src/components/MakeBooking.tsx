import { useEffect, useState } from "react";

function MakeBooking(): JSX.Element {
    const [firstname, setFirstname] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mailingList, setMailingList] = useState<boolean>(false);
    const [numberOfPeople, setNumberOfPeople] = useState<number|null>(null);
    const [date, setDate] = useState<string>(new Date().toISOString().substring(0, 10));
    const [possibleTimes, setPossibleTimes] = useState<string[]>(['17:00', '17:30'])
    const [time, setTime] = useState<string|null>(null);

    useEffect(() => {
        getPossibleTimes(date);
    }, [])

    const getPossibleTimes = async (selectedDate: string) => {
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
            // email: validateEmail(email),
            mailingList,
            numberOfPeople,
            date,
            time,
        }
    }

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
        <input type="date" id="date" min={new Date().toISOString().substring(0, 10)} value={date} onChange={(e) => {setDate(e.target.value); getPossibleTimes(e.target.value)}}/>
        <label htmlFor="time">Choose a time:</label>

        <select id="time" onChange={(e) => {setTime(e.target.value)}}>
        <option disabled selected> -- select an option -- </option>


                {possibleTimes.map((possibleTime, i) => {
                    return (
                        <option key={i} value={possibleTime}>{possibleTime}</option>
                    )
                })}
        </select>
        <button type="button" onClick={handleSubmit}>Submit</button>
    </>
    )
}

export default MakeBooking;