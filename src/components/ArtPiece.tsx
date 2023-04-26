import React, { useState } from "react";
import { artPieceNode } from "../interfaces/interfaces";

const ArtPiece = (props: artPieceNode) => {
  return (
    <div className="group relative pb-3 bg-white rounded-md shadow-lg">
      <div className="h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden bg-stripey">
        <img
          src={props.image}
          alt={`Picture of ${props.title}`}
          className="h-full w-full object-contain lg:h-full lg:w-full"
        />
      </div>
      <div className="pt-4 flex justify-between px-3 border-t-2">
        <div className="">
          <h3 className="text-2xl tracking-wider text-neutral-800 align-middle">
            {props.title} <span className="text-sm normal align-middle">({props.thickness ? (`${props.height}" x ${props.width}" x ${props.thickness}"`) : (`${props.height}" x ${props.width}"`)})</span>
          </h3>
        </div>
        <div className="">
          <p className={
              props.forSale
                ? "font-medium text-blue-600 align-baseline mt-1"
                : "font-medium text-red-300 align-baseline mt-1"
            }>
            {props.forSale ? `$${props.price}` : "Sold"}
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
        <p className="mt-1 text-sm text-gray-500">
            Description: {" "}
          <span className="text-gray-500 italic text-gray-800">
            {props.description || "---"}
          </span>
        </p>
      </div>
      <div className="px-3">
        <p className="mt-1 text-sm text-gray-500">
            Tags: {" "}
          <span className="text-gray-500 italic text-gray-800">
            {props.tags.join(", ")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ArtPiece;
