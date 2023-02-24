import React, { useState } from "react";
import { artPieceNode } from "../interfaces/interfaces";

const ArtPiece = (props: artPieceNode) => {
  return (
    <div className="p-5">
      <img src={props.image} alt={props.title} />
      <div className="text-center">
        <h3 className="text-primary font-semibold text-xl">{props.title} <span className="font-normal">({props.size})</span></h3>
        <h4 className="text-darkgray text-sm">{props.description}</h4>
        <h6 className="text-sm">{props.forSale ? `$${props.price}` : "Not for sale/sold"}</h6>
      </div>
    </div>
  );
};

export default ArtPiece;
