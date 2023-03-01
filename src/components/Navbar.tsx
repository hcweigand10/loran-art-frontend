import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import whistle from "../assets/images/whistle.jpg"
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<string>(window.location.pathname.slice(1));

  return (
    <div className="py-4 border-b-2 border-primary">
      <div className="max-w-2xl mx-auto">
        <nav className="border-gray-200">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <Link to="/" className="flex">
              <img src={whistle} alt="Logo home button" className="h-16"/>
              <span className="self-center text-lg font-semibold whitespace-nowrap mx-3">
                Loran Scruggs
              </span>
            </Link>
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="md:hidden ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center z-10"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={()=>setOpen(!open)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <div className={open ? "md:block w-full md:w-auto" : "hidden md:block w-full md:w-auto"} id="mobile-menu">
              <ul className="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link
                    to="/"
                    className={currentPage === "" || currentPage === "gallery/" ? "text-primary hover:text-primary border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0" : "text-gray-700 hover:text-primary border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0"}
                    onClick={()=>setCurrentPage("")}
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className={currentPage === "contact" ? "text-primary hover:text-primary border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0" : "text-gray-700 hover:text-primary border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0"}
                    onClick={()=>setCurrentPage("contact")}
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="/links"
                    className={currentPage === "links" ? "text-primary hover:text-primary border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0" : "text-gray-700 hover:text-primary border-b border-gray-100 md:hover:bg-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0"}
                    onClick={()=>setCurrentPage("links")}
                  >
                    Links
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
