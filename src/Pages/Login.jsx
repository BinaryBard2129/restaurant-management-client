import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from './AuthProvider';
import { motion } from "motion/react"

const Login = () => {
    const { login, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Successfully Logged In",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Successfully Logged In with Google",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="hero min-h-screen bg-base-200 px-4">
      <div className="hero-content flex-col lg:flex-col justify-center items-center w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl lg:text-5xl font-bold">Login</h1>
        </div>
        <div className="card w-full max-w-md lg:w-96 shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <div className="form-control mt-4">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <motion.button whileHover={{scale: 1.1}}
            whileTap={{scale:0.95}}
              onClick={handleGoogle}
              type="button"
              className="btn btn-outline mt-2"
            >
              Login with Google
            </motion.button>
            <p className="text-sm mt-2 text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;