import React, { useState } from "react";
import { Link } from "react-router-dom";
import toSentenceCase from "../utils/toSentenceCase";

interface props {
  category: string;
  image: string;
}

const GalleryPreview = (props: props) => {
  return (
    <div className="card hover:opacity-80 p-1">
      <Link to={`/gallery/?category=${props.category}`}>
        <img src={props.image} alt={toSentenceCase(props.category)} className="p-1"/>
        <h3 className="text-center hover:opacity-80">{toSentenceCase(props.category)}</h3>
      </Link>
    </div>
  );
};

export default GalleryPreview;
