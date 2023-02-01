import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(window.location.pathname)

  console.log(currentPage)


  return (
    <div className="max-h-screen w-screen m-auto">
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <span className="sr-only">Logo</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <button
                type="button"
                className="z-0 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 z-50"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">Open menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            <nav className="hidden md:flex space-x-10 flex-1 justify-center">

              <Link
                to="/"
                className={currentPage === "" ? "text-base font-medium transition linear hover:-translate-y-1 hover:scale-110 duration-300 text-orange-600" : "text-base font-medium transition linear hover:-translate-y-1 hover:scale-110 duration-300"}
                onClick={() => setCurrentPage("")}
                >
                Gallery
              </Link>
              <Link
                to="/contact"
                className={currentPage === "/contact" ? "text-base font-medium transition linear hover:-translate-y-1 hover:scale-110 duration-300 text-orange-600" : "text-base font-medium transition linear hover:-translate-y-1 hover:scale-110 duration-300"}
                onClick={() => setCurrentPage("/contact")}
                >
                Contact
              </Link>
              <Link
                to="/about"
                className={currentPage === "/about" ? "text-base font-medium transition linear hover:-translate-y-1 hover:scale-110 duration-300 text-orange-600" : "text-base font-medium transition linear hover:-translate-y-1 hover:scale-110 duration-300"}
                onClick={() => setCurrentPage("/about")}
                >
                About
              </Link>
            </nav>
            
          </div>
        </div>


        <div
          className={
            open
              ? "opacity-100 scale-100 transition ease-out duration-200 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden z-50"
              : "opacity-0 scale-95 absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden -z-50 pointer-events-none select-none"
          }
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="-mr-2">
                  <button
                    type="button"
                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    onClick={() => setOpen(!open)}
                  >
                    <span className="sr-only">Close menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <Link
                    to="/"
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Home
                  </Link>
                  <Link
                    to="/contact"
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    Contact
                  </Link>
                  <Link
                    to="/about"
                    className="text-base font-medium text-gray-500 hover:text-gray-900"
                  >
                    About
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Navbar;
