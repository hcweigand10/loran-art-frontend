import React, { useState } from "react";
import { artPieceNode } from "../interfaces/interfaces";

const ArtPiece = (props: artPieceNode) => {
  return (
    <div className="group relative pb-3 bg-white rounded-md shadow-lg">
      <div className="min-h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 h-80">
        <img
          src={props.image}
          alt={`Picture of ${props.title}`}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="pt-4 flex justify-between px-3 border-t-2">
        <div className="">
          <h3 className="text-2xl tracking-wider text-neutral-800 align-middle">
            {props.title} <span className="text-sm normal align-middle">({props.size})</span>
          </h3>
        </div>
        <div className="">
          <p className={
              props.forSale
                ? "font-medium text-blue-600 align-baseline mt-1"
                : "font-medium text-red-300 align-baseline mt-1"
            }>
            {props.forSale ? `$${props.price}` : "Not for sale"}
          </p>
          {/* <p
            className={
              props.forSale
                ? "font-medium text-gray-900 align-baseline"
                : "font-medium text-gray-500 italic align-baseline"
            }
          >
            {props.forSale ? `$${props.price}` : "Not for sale"}
          </p> */}
        </div>
      </div>
      <div className="px-3">
        <p className="mt-1 text-sm">
          <span className="italic text-gray-500">
            {props.description || "---"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ArtPiece;
