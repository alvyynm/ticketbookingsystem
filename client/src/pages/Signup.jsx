import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Signup() {
  return (
    <>
      <div className="h-vh">
        <div className="hero min-h-96 bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign up </h1>
              <p className="py-6">
                Sign up to EventMania now and start buying your tickets to great
                upcoming events. It&apos;s free
              </p>
              <p className="py-2">
                Already have an account?{" "}
                <Link to="/login" className="link">
                  Login
                </Link>
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="full name"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
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
                    placeholder="password"
                    className="input input-bordered"
                    required
                  />
                  <span className="label-text-alt text-white">
                    Must be 8-characters long, include uppercase, lowercase
                    letters, digits and special characters
                  </span>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="confirm password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-white">
                      Should be identical to Password field
                    </span>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
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

export default Signup;
