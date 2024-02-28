import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin.jsx";
import EventLists from "./components/EventLists.jsx";
import Event from "./components/Event.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  return (
    <Router>
      <>{<Navbar />}</>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />}>
          <Route index element={<EventLists />} />
          <Route path=":eventId" element={<Event />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
