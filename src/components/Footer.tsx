import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFlickr,
  faPinterest,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    
    <footer className="relative bg-neutral-200 pt-8 pb-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full md:w-6/12 px-4">
            <h4 className="text-3xl text-neutral-700">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-neutral-600">
              Find me on any of these platforms
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button
                className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:-translate-y-1"
                type="button"
              >
                <a href="https://www.facebook.com/671809086" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFacebook}/>
                </a>
              </button>
              <button
                className="bg-white text-insta shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:-translate-y-1"
                type="button"
              >
                <a href="https://www.instagram.com/loranscruggs1/" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faInstagram}/>
                </a>
              </button>
              <button
                className="bg-white text-pink-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:-translate-y-1"
                type="button"
              >
                <a href="https://flickr.com/people/loranscruggs" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faFlickr}/>
                </a>
              </button>
              <button
                className="bg-white text-red-500 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 hover:-translate-y-1"
                type="button"
              >
                <a href="https://pinterest.com/loranscruggs" target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faPinterest}/>
                </a>
              </button>
            </div>
          </div>
          <div className="w-full md:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-2">
              <div className="md:ml-auto">
                <span className="block uppercase text-neutral-500 text-sm font-semibold mb-2">
                  Navigation Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-neutral-600 hover:text-neutral-800 font-semibold block pb-2 text-sm"
                      href="/"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-neutral-600 hover:text-neutral-800 font-semibold block pb-2 text-sm"
                      href="/about"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-neutral-600 hover:text-neutral-800 font-semibold block pb-2 text-sm"
                      href="/contact"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-neutral-600 hover:text-neutral-800 font-semibold block pb-2 text-sm"
                      href="/admin"
                    >
                      Admin
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-neutral-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-neutral-500 font-semibold py-1">
              Website by: <span><a
                href="https://henryweigand.com"
                className="text-neutral-500 hover:text-gray-800 underline"
                target="_blank"
              >
                {" "}
                henryweigand.com
              </a></span>
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
