import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <nav>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            EventMania
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <details>
                <summary>{userInfo ? userInfo.name : "Account"}</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  {userInfo ? (
                    <>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <button>Logout</button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                      <li>
                        <Link to="/signup">Signup</Link>
                      </li>
                    </>
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
