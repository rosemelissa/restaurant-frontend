import { greet } from "./utils/greet";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./components/Home";
import MakeBooking from "./components/MakeBooking";
import BookingConfirmation from "./components/BookingConfirmation";
import AdminTools from "./components/AdminTools";
import AdminCalendar from "./components/AdminCalendar";
import AdminCovers from "./components/AdminCovers";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Home
            />
          }
        />
        <Route
          path="/make-booking"
          element={
            <MakeBooking
            />
          }
        />
        {/* <Route
          path="/booking-confirmation"
          element={
            <BookingConfirmation
            />
          }
        /> */}
        <Route
          path="/admin-tools"
          element={
            <AdminTools
            />
          }
        />
        <Route
          path="/admin-calendar"
          element={
            <AdminCalendar
            />
          }
        />
        <Route
          path="/admin-covers"
          element={
            <AdminCovers
            />
          }
        />
      </Routes>
    </BrowserRouter>
    );
}

export default App;
