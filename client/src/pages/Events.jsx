import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
function Events() {
  return (
    <>
      <section>
        <h1>All EVents</h1>
        <Outlet />
      </section>
      <Footer />
    </>
  );
}

export default Events;
