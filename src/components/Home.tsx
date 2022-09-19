import { Link } from "react-router-dom";

function Home(): JSX.Element {
    return (
        <>
            <p>Home</p>
            <Link to="/make-booking" id='make-booking-link'>Make booking</Link>
            <Link to="/admin-tools" id='admin-tools-link' className='orange-button'>Admin Tools</Link>
        </>
    )
}

export default Home;