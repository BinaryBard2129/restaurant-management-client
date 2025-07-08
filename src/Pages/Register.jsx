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
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
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
    <div className="hero min-h-screen bg-base-200 px-4">
      <div className="hero-content flex-col lg:flex-col justify-center items-center w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl lg:text-5xl font-bold">Register now!</h1>
        </div>
        <div className="card w-full max-w-md lg:w-96 shadow-2xl bg-base-100">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                placeholder="Your Name"
                className="input input-bordered"
                required
              />
            </div>
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
              <label className="label">Photo URL</label>
              <input
                name="photoURL"
                type="text"
                placeholder="Photo URL"
                className="input input-bordered"
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
                Register
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogle}
              type="button"
              className="btn btn-outline mt-2"
            >
              Register with Google
            </motion.button>
            <p className="text-sm mt-2 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
