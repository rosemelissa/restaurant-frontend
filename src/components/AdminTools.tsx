import { Link } from "react-router-dom";

function AdminTools(): JSX.Element {
    return (
        <div id='admin-tools'>
        <h1>Admin tools</h1>
        <Link to="/" id='home-link' className='orange-button top-left-button'>Home</Link>
        <Link to="/admin-calendar" className='orange-button'>Calendar</Link>
        <Link to="/admin-covers" className='orange-button'>Covers</Link>
        </div>
    )
}

export default AdminTools;