import React, { useState } from "react";
import { artPieceNode } from "../interfaces/interfaces";

const ArtPiece = (props: artPieceNode) => {
  return (
    <div className="group relative pb-3 bg-white rounded-md shadow-lg">
        <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 h-80">
          <img src={props.image} alt={`Picture of ${props.title}`} className="h-full w-full object-cover object-center lg:h-full lg:w-full"/>
        </div>
        <div className="pt-4 flex justify-between px-3 border-t-2">
          <div>
            <h3 className="text-2xl tracking-wider text-neutral-800">
              {props.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{props.description || "---"}</p>
          </div>
          <p className={props.forSale ? "font-medium text-gray-900" : "font-medium text-gray-500 italic"}>{props.forSale ? `$${props.price}` : "Not for sale"}</p>
        </div>
      </div>
  );
};

export default ArtPiece;
