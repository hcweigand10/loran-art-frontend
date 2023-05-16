import React, { useState } from "react";
import { artPieceNode } from "../interfaces/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRuler } from "@fortawesome/free-solid-svg-icons";

const ArtPiece = (props: artPieceNode) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col space-y-3 rounded-xl p-3 mx-auto w-full hover:cursor-pointer hover:opacity-80">
        <div className="w-full grid place-items-center">
          <img
            src={props.image}
            alt={props.title}
            className="rounded-xl w-full"
          />
        </div>
        <div className="w-full flex flex-col space-y-2 p-3">
          <div className="flex justify-between item-center">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faRuler}/>
              <p className="text-gray-500 text-sm ml-2">
                {props.thickness
                  ? `${props.height}" x ${props.width}" x ${props.thickness}"`
                  : `${props.height}" x ${props.width}"`}
              </p>
            </div>
            <div className={props.tags.length>0 ? "bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 italic" : "bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 italic hidden"}>
              {props.tags && props.tags.join(", ")}
            </div>
          </div>
          <h3 className="font-black text-gray-800 md:text-3xl text-xl">
            {props.title}
          </h3>
          <p className="md:text-lg text-gray-500 text-base">
            {props.description}
          </p>
          <p className={props.forSale ? "text-xl font-black text-gray-800" : "text-xl italic text-red-400"}>{props.forSale ? `$${props.price}` : "Sold"}</p>
        </div>
      </div>
    </div>
  );
};

export default ArtPiece;

{
  /* <div className="h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden bg-stripey">
    <img
    src={props.image}
    alt={`Picture of ${props.title}`}
    className="h-full w-full object-contain lg:h-full lg:w-full"
    />
    </div>
    <div className="mt-3">
    <div className="px-3">
    <p
    className={
      props.forSale ? "text-md text-gray-400" : "text-md text-red-400"
    }
    >
    {props.forSale ? `$${props.price}` : "Sold"}
    </p>
    </div>
    <div className="px-3">
    <h3 className="text-lg text-neutral-900 align-middle font-medium">
    {props.title}
    </h3>
    </div>
    <div className="px-3">
    <p className="text-sm text-gray-400">
    {props.thickness
      ? `${props.height}" x ${props.width}" x ${props.thickness}"`
      : `${props.height}" x ${props.width}"`}
      </p>
      </div>
      
      <div className="px-3">
      <p className="text-gray-500 italic">{props.description || "---"}</p>
      </div>
    </div> */
}
