import { Outlet } from "react-router-dom";
function Events() {
  return (
    <section>
      <h1>All EVents</h1>
      <Outlet />
    </section>
  );
}

export default Events;
