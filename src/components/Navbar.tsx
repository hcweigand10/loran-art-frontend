import React, { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import whistle from "../assets/images/whistle.jpg";
import { Link } from "react-router-dom";
import "../css/navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(
    window.location.pathname.slice(1)
  );

  return (
    <div className="py-2 border-b-2 bg-primary text-white mb-10">
      <nav className="w-full">
        <div className="max-w-4xl mx-auto z-20">
          <div className="container mx-auto flex flex-wrap items-center justify-between">
            <Link to="/" className="flex z-30">
              <img src={whistle} alt="Logo home button" className="h-16" />
              <span className="self-center text-lg font-light whitespace-nowrap mx-3">
                Loran Scruggs Art
              </span>
            </Link>
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="ml-3 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg inline-flex items-center justify-center" 
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setOpen(!open)}
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
          </div>
        </div>
        <div
          className={
            open
              ? "w-full absolute transition-all top-20 z-10 text-white pb-5 border-b-2 bg-primary" : "w-full absolute transition-all -top-16 -z-10 bg-white border-b-2 border-primary"
               
          }
          id="mobile-menu"
        >
          <div className="max-w-4xl mx-auto">
            <ul className="flex-col flex mt-4">
              <li>
                <Link
                  to="/"
                  className={
                    currentPage === "" || currentPage === "gallery/"
                      ? "text-neutral-300 hover:text-neutral-300 border-b border-gray block pl-3 pr-4 py-2"
                      : "hover:text-neutral-300 border-b border-gray block pl-3 pr-4 py-2"
                  }
                  onClick={() => setCurrentPage("")}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={
                    currentPage === "contact"
                      ? "text-neutral-300 hover:text-neutral-300 border-b border-gray block pl-3 pr-4 py-2"
                      : "hover:text-neutral-300 border-b border-gray block pl-3 pr-4 py-2"
                  }
                  onClick={() => setCurrentPage("contact")}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/links"
                  className={
                    currentPage === "links"
                      ? "text-neutral-300 hover:text-neutral-300 border-b border-gray block pl-3 pr-4 py-2"
                      : "hover:text-neutral-300 border-b border-gray block pl-3 pr-4 py-2"
                  }
                  onClick={() => setCurrentPage("links")}
                >
                  Links
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
