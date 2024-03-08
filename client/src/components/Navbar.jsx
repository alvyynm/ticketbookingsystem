import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../app/api/authApiSlice";
import { removeCredentials } from "../features/auth/authSlice";

function Navbar() {
  const { name } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout, { isLoading, error }] = useLogoutMutation();

  const handleLogout = async () => {
    const res = await logout().unwrap();

    if (res.status === "success") {
      dispatch(removeCredentials());
      navigate("/");
      // reload page after logout
      window.location.reload(true);
    }
  };

  return (
    <nav>
      <div className="navbar bg-base-100 pb-12">
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
                <summary>{name ? name : "Account"}</summary>
                <ul className="p-2 bg-base-100 rounded-t-none">
                  {name ? (
                    <>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <button onClick={handleLogout}>Logout</button>
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
