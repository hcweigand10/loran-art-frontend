import React, { useState } from "react";
import whistle from "../assets/images/whistle.jpg";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>(
    `/${window.location.pathname.slice(1).split("/")[0]}` || ""
  );

  const pages = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Links", path: "/links" },
  ];

  const links = pages.map((page, index) => {
    return (
      <li
        className={`text-lg tracking-wider
        text-lg tracking-wider font-medium h-full px-4
          ${currentPage === page.path
            ? "text-blue-600"
            : "text-neutral-800 hover:text-blue-400 hover:bg-neutral-100"}`
        }
        key={index}
      >
        <Link className="h-full flex items-center" to={page.path} onClick={() => setCurrentPage(page.path)}>
          {page.name}
        </Link>
      </li>
    );
  });

  return (
    <nav className="w-full bg-white shadow">
      <div className="justify-between px-4 mx-auto md:items-center md:flex md:px-8 h-16">
        <div className="flex items-center justify-between md:block h-full">
          <Link to="/" className="flex">
            <div className="pr-2">
              <img src={whistle} alt="" className="h-12" />
            </div>
            <div className="">
              <h2 className="text-2xl text-black">Loran Scruggs</h2>
              <h5 className="text-sm text-neutral-600">
                Art, Toys, and Whistles
              </h5>
            </div>
          </Link>
          <div className="md:hidden">
            <button
              className="px-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex pb-3 md:block md:pb-0 md:mt-0 h-full ${
            open ? "block" : "hidden"
          }`}
        >
          <ul className="items-center justify-center space-y-8 md:flex md:space-y-0 h-full">
            {links}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
