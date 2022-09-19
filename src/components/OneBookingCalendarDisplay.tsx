import IBookingsData from "../utils/interfaces";

interface OneBookingCalendarDisplayProps {
    booking: IBookingsData;
}


function OneBookingCalendarDisplay({booking}: OneBookingCalendarDisplayProps): JSX.Element {
    return (
        <div className={`one-booking-calendar-display table-${booking.table_id} time-${booking.time.replace(':', '')}`}>
            <p>{booking.firstname} {booking.surname}</p>
        </div>
    )
}

export default OneBookingCalendarDisplay;