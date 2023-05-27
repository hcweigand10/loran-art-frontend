import React from "react";
import { Link } from "react-router-dom";
import toSentenceCase from "../utils/toSentenceCase";

interface props {
  category: string;
  image: string;
}

const GalleryPreview = (props: props) => {
  return (
    <div className="card hover:shadow-xl drop-shadow-md relative hover:opacity-100 opacity-90 transition-all">
      <Link to={props.category == "wall-art" ? `/gallery/wall-art` : `/gallery/?category=${props.category}`}>
        <img
          src={props.image}
          alt={toSentenceCase(props.category)}
          className="w-full object-cover h-60"
        />
        <h3
          className="text-center absolute bottom-6 left-0 bg-neutral-200 border-r-2 border-t-2 border-b-2 border-neutral-400 p-2 shadow-md rounded-r text-neutral-800 tracking-wider"
          // style={{ textShadow: "-1px -1px 0 #000" }}
        >
          {toSentenceCase(props.category)}
        </h3>
      </Link>
    </div>
  );
};

export default GalleryPreview;
