import { Link } from "react-router-dom";

function Home(): JSX.Element {
    return (
        <>
            <p>Home</p>
            <Link to="/make-booking">Make booking</Link>
            <Link to="/admin-tools">Admin Tools</Link>
        </>
    )
}

export default Home;