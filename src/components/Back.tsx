import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Back = () => {
  return (
    <Link
      to="/"
      className="absolute top-2 left-0 border-b border-primary text-neutral-500"
    >
      <FontAwesomeIcon icon={faArrowLeft} /> Go back
    </Link>
  );
};

export default Back;
