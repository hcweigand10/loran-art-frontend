import React, { useState } from "react";
import { Link } from "react-router-dom";
import whistle from "../assets/images/whistle.jpg";

interface props {
  category: string;
  image: string;
}

const GalleryPreview = (props: props) => {
  return (
    <div className="card hover:opacity-80 p-1">
      <Link to="/gallery/?category=lg-wall">
        <img src={whistle} alt="Art for small walls" />
        <h3 className="text-center hover:opacity-80">{props.category}</h3>
      </Link>
    </div>
  );
};

export default GalleryPreview;
