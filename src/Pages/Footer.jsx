import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">About Us</h3>
            <p className="text-gray-400 text-sm">
              Delicious meals delivered fresh to your door. Quality food with love and care.
            </p>
          </div>

          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/" className="hover:text-yellow-500 transition">Home</a>
              </li>
              <li>
                <a href="/foods" className="hover:text-yellow-500 transition">All Foods</a>
              </li>
              <li>
                <a href="/about" className="hover:text-yellow-500 transition">About</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-yellow-500 transition">Contact</a>
              </li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Contact</h3>
            <p className="text-gray-400 text-sm mb-2">123 Food Street, Cityville</p>
            <p className="text-gray-400 text-sm mb-2">Phone: +1 234 567 890</p>
            <p className="text-gray-400 text-sm">Email: support@restaurant.com</p>
          </div>

         
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-yellow-500 transition">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12a10 10 0 10-11.5 9.9v-7h-3v-3h3v-2c0-3 1.8-4.7 4.5-4.7 1.3 0 2.6.2 2.6.2v3h-1.5c-1.5 0-2 1-2 2v2h3.4l-.5 3h-2.9v7A10 10 0 0022 12z" />
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-yellow-500 transition">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.09 9.09 0 01-2.89 1.1 4.52 4.52 0 00-7.7 4.13A12.85 12.85 0 013 4.59a4.51 4.51 0 001.4 6.03 4.46 4.46 0 01-2.05-.56v.05a4.52 4.52 0 003.62 4.43 4.5 4.5 0 01-2.04.08 4.52 4.52 0 004.21 3.14 9 9 0 01-5.6 1.93A9.16 9.16 0 012 19.54 12.71 12.71 0 008.29 21c7.55 0 11.68-6.26 11.68-11.69 0-.18 0-.35-.01-.53A8.18 8.18 0 0023 3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-yellow-500 transition">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Your Restaurant. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
