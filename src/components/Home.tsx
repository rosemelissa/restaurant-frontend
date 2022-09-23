import { Link } from "react-router-dom";
import Slideshow from "./Slideshow";

function Home(): JSX.Element {
  return (
    <div id="home-page">
      <div id="restaurant-info">
        <div id="restaurant-info-text">
          <h1>Tasty restuarant</h1>
          <p>Great food, great drinks, great service</p>
          <Link
            to="/make-booking"
            id="make-booking-link"
            className="green-button"
          >
            Make booking
          </Link>
        </div>
        <div id="restaurant-info-slideshow">
          <Slideshow />
        </div>
      </div>
      <Link to="/admin-tools" id="admin-tools-link" className="orange-button">
        Admin Tools
      </Link>
    </div>
  );
}

export default Home;
