import React, { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router';

const Register = () => {
  const { register, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
    return regex.test(password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const photoURL = form.photoURL.value.trim();
    const password = form.password.value;

    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, and 1 special character."
      );
      return;
    }

    register(email, password)
      .then(async (result) => {
        const user = result.user;
        await updateProfile(user, { displayName: name, photoURL });

        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${name}!`,
          showConfirmButton: false,
          timer: 2000,
        });

        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => navigate("/"))
      .catch((err) => setError(err.message));
  };

  return (
    <div className="min-h-screen mt-8 flex items-center justify-center bg-gradient-to-br from-red-100 via-red-50 to-white px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-extrabold text-red-600 mb-8 text-center tracking-wide">
          Register Now!
        </h1>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="photoURL">
              Photo URL (optional)
            </label>
            <input
              id="photoURL"
              name="photoURL"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              className="input input-bordered w-full rounded-xl border-gray-300 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              required
              autoComplete="new-password"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-1 font-medium select-none">{error}</p>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            Register
          </button>
        </form>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGoogle}
          type="button"
          className="w-full mt-6 py-3 border-2 border-red-600 text-red-600 rounded-xl font-semibold hover:bg-red-50 shadow-sm transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-200"
        >
          Register with Google
        </motion.button>

        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-red-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
