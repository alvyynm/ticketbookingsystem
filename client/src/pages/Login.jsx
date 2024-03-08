import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../app/api/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";

import Footer from "../components/Footer";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  useEffect(() => {
    setErrorMessage("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res;

    try {
      res = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          user: res?.data?.email,
          accessToken: res?.data?.token,
          name: res?.data?.name,
        })
      );
      setEmail("");
      setPassword("");
      navigate("/admin");
      // reload page after login
      window.location.reload(true);
    } catch (err) {
      // TODO: display error message using react-toastify
      if (!err?.originalStatus) {
        setErrorMessage("No server response");
      } else if (err.originalStatus?.status === 400) {
        setErrorMessage("Missing username or password");
      } else if (err.originalStatus?.status === 401) {
        setErrorMessage("Unauthorized");
      } else {
        setErrorMessage("Login failed");
      }
    }
  };

  return (
    <>
      <div className="h-96">
        <div className="hero min-h-48 bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Sign up to EventMania now and start buying your tickets to great
                upcoming events. It&apos;s free
              </p>
              <p className="py-2">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="link">
                  Register
                </Link>
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <Link to="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn btn-primary"
                  >
                    {isLoading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
