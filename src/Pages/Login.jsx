import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';

const Login = () => {
  const { login, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const email = form.email.value.trim();
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 via-red-50 to-white px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-red-600 mb-8 text-center tracking-wide">
          Login
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              required
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-1 font-medium select-none">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            Login
          </button>
        </form>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoogle}
          type="button"
          className="w-full mt-6 py-3 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 shadow-sm transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-200"
        >
          Login with Google
        </motion.button>

        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
