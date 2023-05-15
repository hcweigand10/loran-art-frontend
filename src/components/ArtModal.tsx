import React, { SetStateAction, useState, Dispatch } from "react";
import { artPiece } from "../interfaces/interfaces";

interface props {
  artpiece: {
    id?: number;
    title: string;
    description: string;
    height: number;
    width: number;
    thickness: number;
    price: number;
    forSale: boolean;
    image: string;
    notes: string;
    CategoryId: number;
    category?: string;
    Tags: any[];
  };
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

const ArtModal = (props: props) => {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => props.setShowModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
          {/* header */}
          <div className="px-4 py-2">
            <h2 className="text-xl tracking-wider font-bold">
              {props.artpiece.title}
            </h2>
            <h2
              className={
                props.artpiece.forSale
                  ? "text-lg text-neutral-600 align-baseline"
                  : "text-lg text-red-300 align-baseline"
              }
            >
              {props.artpiece.forSale ? `$${props.artpiece.price}` : "Sold"}
            </h2>
          </div>
          {/* body */}
          <div className="px-4">
            <img
              src={props.artpiece.image}
              alt="enlarged image"
              className="w-full"
            />
          </div>
          <div className="px-4 pt-2">
            <h3 className="text-lg tracking-wider text-neutral-800 align-middle">
              Size: {" "}
              {props.artpiece.thickness
                ? `${props.artpiece.height}" x ${props.artpiece.width}" x ${props.artpiece.thickness}"`
                : `${props.artpiece.height}" x ${props.artpiece.width}"`}
            </h3>
          </div>
          <div className="px-4">
            <p className="mt-1 text-sm text-gray-500">
              Description:{" "}
              <span className="text-gray-500 italic text-gray-800">
                {props.artpiece.description || "---"}
              </span>
            </p>
          </div>
          <div className="px-4">
            <p className="mt-1 text-sm text-gray-500">
              Tags:{" "}
              <span className="text-gray-500 italic text-gray-800">
                {props.artpiece.Tags.map((tagObj: any) => tagObj.name).join(
                  ", "
                )}
              </span>
            </p>
          </div>
          {/* footer  */}
          <div className="items-center gap-2 mt-3 bg-gray-50 p-4 flex justify-end">
            <button
              className="bg-white p-2.5 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
              onClick={() => props.setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtModal;
