import { useState } from "react";

function MakeBooking(): JSX.Element {
    const [firstname, setFirstname] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [mailingList, setMailingList] = useState<boolean>(false);
    const [numberOfPeople, setNumberOfPeople] = useState<number|null>(null);
    const [date, setDate] = useState<string|null>(null)

    return (
        <p>Make a booking</p>
    )
}

export default MakeBooking;