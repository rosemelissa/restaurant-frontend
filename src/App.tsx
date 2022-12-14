import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import MakeBooking from "./components/MakeBooking";
import AdminTools from "./components/AdminTools";
import AdminCalendar from "./components/AdminCalendar";
import AdminCovers from "./components/AdminCovers";
import AdminTables from "./components/AdminTables";
// import "bootstrap/dist/css/bootstrap.min.css";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make-booking" element={<MakeBooking />} />
        {/* <Route
          path="/booking-confirmation"
          element={
            <BookingConfirmation
            />
          }
        /> */}
        <Route path="/admin-tools" element={<AdminTools />} />
        <Route path="/admin-calendar" element={<AdminCalendar />} />
        <Route path="/admin-covers" element={<AdminCovers />} />
        <Route path="/admin-tables" element={<AdminTables />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
