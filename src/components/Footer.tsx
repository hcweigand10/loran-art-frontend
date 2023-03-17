import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFlickr,
  faPinterest,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 text-center text-neutral-600 dark:bg-neutral-600 dark:text-neutral-200 lg:text-left">
      <div className="flex items-center justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 lg:justify-between">
        <div className="mx-auto text-lg">
          <a
            href="https://twitter.com/recycledtoys"
            target="_blank"
            rel="noreferrer"
            className="mx-3 text-neutral-600 dark:text-neutral-200 hover:opacity-80 hover:-translate-y-1 transition-all"
            title="Twitter"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            href="http://www.flickr.com/people/loranscruggs/"
            target="_blank"
            rel="noreferrer"
            className="mx-3 text-neutral-600 dark:text-neutral-200 hover:opacity-80 hover:-translate-y-1 transition-all"
            title="Flickr"
          >
            <FontAwesomeIcon icon={faFlickr} />
          </a>
          <a
            href="http://pinterest.com/loranscruggs"
            target="_blank"
            rel="noreferrer"
            className="mx-3 text-neutral-600 dark:text-neutral-200 hover:opacity-80 hover:-translate-y-1 transition-all"
            title="Pinterest"
          >
            <FontAwesomeIcon icon={faPinterest} />
          </a>
          <a
            href="http://www.facebook.com/671809086"
            target="_blank"
            rel="noreferrer"
            className="mx-3 text-neutral-600 dark:text-neutral-200 hover:opacity-80 hover:-translate-y-1 transition-all"
            title="Facebook"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
        </div>
      </div>
      <div className="mx-6 py-6 text-center md:text-left">
        <div className="flex justify-center">
          <div>
            <h6 className="mb-4 block text-center font-semibold uppercase md:justify-start">
              Contact
            </h6>
            <div className="flex">
              <FontAwesomeIcon icon={faHome} className="mr-3 translate-y-1"/>
              <p className="mb-4 flex items-center justify-center md:justify-start">
                Port Townsend, WA, USA
              </p>
            </div>
            <div className="flex">
              <a
                href="mailto:loran-scruggs@yahoo.com"
                className="underline flex"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-3 translate-y-1"/>
                <p className="mb-4 flex items-center justify-center md:justify-start">
                  loran-scruggs@yahoo.com
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-neutral-200 p-4 text-center dark:bg-neutral-700">
        <span>Website by: </span>
        <a
          className="font-semibold text-neutral-600 dark:text-neutral-400"
          href="https://henryweigand.com"
        >
          henryweigand.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
