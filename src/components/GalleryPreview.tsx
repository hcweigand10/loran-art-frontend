import React, { useState } from "react";
import { Link } from "react-router-dom";
import toSentenceCase from "../utils/toSentenceCase";

interface props {
  category: string;
  image: string;
}

const GalleryPreview = (props: props) => {
  return (
    <div className="card hover:shadow-lg shadow-soft drop-shadow-md relative hover:opacity-100 opacity-90 transition-all">
      <Link to={`/gallery/?category=${props.category}`}>
        <img
          src={props.image}
          alt={toSentenceCase(props.category)}
          className="w-full object-cover h-60"
        />
        <h3
          className="text-center absolute bottom-6 left-0 bg-seagreen border-r-2 border-t-2 border-b-2 border-neutral-700 p-2 shadow-md rounded-r text-white font-bold"
          // style={{ textShadow: "-1px -1px 0 #000" }}
        >
          {toSentenceCase(props.category)}
        </h3>
      </Link>
    </div>
  );
};

export default GalleryPreview;
