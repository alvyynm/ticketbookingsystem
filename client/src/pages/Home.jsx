import Footer from "../components/Footer";
import EventLists from "../components/EventLists";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="hero min-h-32 py-8 bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="lg:text-4xl text-2xl font-bold">
              Book Events In Minutes
            </h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <Link to="/events">
              <button className="btn btn-primary">View All Events</button>
            </Link>
          </div>
        </div>
      </div>
      <EventLists />
      <Footer />
    </>
  );
}

export default Home;
