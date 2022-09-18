import { Link } from "react-router-dom";

function AdminTools(): JSX.Element {
    return (
        <><p>Admin tools</p>
        <Link to="/">Home</Link>
        <Link to="/admin-calendar">Calendar</Link>
        <Link to="/admin-covers">Covers</Link>
        </>
    )
}

export default AdminTools;