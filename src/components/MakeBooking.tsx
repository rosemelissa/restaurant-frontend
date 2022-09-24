import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import validateEmail from "../utils/validateEmail";

function MakeBooking(): JSX.Element {
  const [firstname, setFirstname] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mailingList, setMailingList] = useState<boolean>(false);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
  const [date, setDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [possibleTimes, setPossibleTimes] = useState<string[]>([]);
  const [time, setTime] = useState<string | null>(null);
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!bookingSubmitted) {
      getPossibleTimes(date, numberOfPeople);
    }

    // eslint-disable-next-line
  }, [bookingSubmitted]);

  const getPossibleTimes = async (
    selectedDate: string,
    selectedNumberOfPeople: number
  ) => {
    const res = await axios.get(
      `${baseUrl}/possibletimes/${selectedDate}/${selectedNumberOfPeople}`
    );
    setPossibleTimes(res.data);
    setTime(null);
  };

  const handleSubmit = async () => {
    if (validateEmail(email)) {
      try {
        const body = {
          firstname,
          surname,
          email,
          mailingList,
          numberOfPeople,
          date,
          time,
        };
        await axios.post(`${baseUrl}/newbooking`, body);
        setBookingSubmitted(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      window.alert("Invalid email address");
    }
  };

  const startNewBooking = () => {
    setFirstname("");
    setSurname("");
    setEmail("");
    setMailingList(false);
    setNumberOfPeople(2);
    setDate(new Date().toISOString().substring(0, 10));
    setPossibleTimes([]);
    setTime(null);
    setBookingSubmitted(false);
  };

  const allTimes = [
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ];

  if (bookingSubmitted) {
    return (
      <>
        <Link to="/" className="green-button top-left-button">
          Home
        </Link>
        <div id="booking-confirmation">
          <h1>Booking confirmation</h1>
          <p>A confirmation email has been sent to: {email}</p>
          <div id="booking-confirmation-buttons">
            <button
              type="button"
              className="green-button"
              onClick={startNewBooking}
            >
              Make a new booking
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Link to="/" className="green-button top-left-button">
          Home
        </Link>
        <div id="booking-input">
          <h1>Make a booking</h1>
          <div id="booking-form">
            <label htmlFor="firstname">
              First name
              <input
                id="firstname"
                type="text"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </label>
            <label htmlFor="surname">
              Surname
              <input
                id="surname"
                type="text"
                placeholder="Enter your surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </label>
            <label htmlFor="email">
              Email address
              <input
                required
                id="email"
                type="text"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="mailing-list">
              Join our mailing list?
              {mailingList ? (
                <input
                  type="checkbox"
                  defaultChecked
                  id="mailing-list"
                  onClick={() => setMailingList(false)}
                />
              ) : (
                <input
                  type="checkbox"
                  id="mailing-list"
                  onClick={() => setMailingList(true)}
                />
              )}
            </label>
            <label htmlFor="date">
              Choose a date:
              <input
                type="date"
                id="date"
                min={new Date().toISOString().substring(0, 10)}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  getPossibleTimes(e.target.value, numberOfPeople);
                }}
              />
            </label>
            <label htmlFor="number-of-people">
              Group size (max 10):
              <select
                id="number-of-people"
                onChange={(e) => {
                  setNumberOfPeople(parseInt(e.target.value));
                  getPossibleTimes(date, parseInt(e.target.value));
                }}
              >
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
            </label>
            <label htmlFor="time">
              Choose a time:
              {
                <>
                  <select
                    id="time"
                    onChange={(e) => {
                      setTime(e.target.value);
                    }}
                  >
                    <option disabled selected>
                      {" "}
                      -- select an option --{" "}
                    </option>
                    {allTimes.map((time, i) => {
                      return possibleTimes.includes(time) ? (
                        <option key={i} value={time}>
                          {time}
                        </option>
                      ) : (
                        <option key={i} value={time} disabled>
                          {time}
                        </option>
                      );
                    })}
                  </select>
                  {time && (
                    <button
                      type="button"
                      className="green-button bottom-middle-button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  )}
                </>
              }
            </label>
            {possibleTimes.length === 0 && (
              <>
                <p id="none-free">
                  No times available, try a different date/group size
                </p>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MakeBooking;
