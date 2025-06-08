import React from "react";

export function NavBar() {
  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://via.placeholder.com/150"
                alt="Logo"
              />
            </div>
            {/* Mobile Menu Button */}
            <div className="block sm:hidden">
              <button className="text-white hover:bg-gray-700 focus:outline-none px-4 py-2 rounded-md">
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="hidden sm:block">
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Shop
              </a>
              <a
                href="#"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <a
                href="#"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Contact
              </a>
            </div>
          </div>
          {/* Search Bar and User Menu */}
          <div className="hidden sm:block">
            <div className="flex items-center">
              {/* Search Bar */}
              <div className="relative bg-gray-700 rounded-lg px-3 py-2">
                <input
                  type="text"
                  className="bg-transparent border-none text-white placeholder-gray-400 focus:outline-none"
                  placeholder="Search"
                />
                <button className="absolute right-0 top-0 mr-2 mt-1">
                  <svg
                    className="h-5 w-5 fill-current text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M21.32 19.91l-3.84-3.83c1.15-1.42 1.86-3.28 1.86-5.32 0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.04 0 3.9-.68 5.32-1.86l3.83 3.84c.39.39 1.02.39 1.41 0l1.42-1.41c.38-.39.38-1.02 0-1.41zM5 10c0-3.31 2.69-6 6-6s6 2.69 6 6-2.69 6-6 6-6-2.69-6-6z"
                    />
                  </svg>
                </button>
              </div>
              {/* User Menu */}
              <div className="flex items-center ml-4">
                <a
                  href="#"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </a>
                <a
                  href="#"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Cart
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="sm:hidden bg-gray-800">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Shop
          </a>
          <a
            href="#"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
