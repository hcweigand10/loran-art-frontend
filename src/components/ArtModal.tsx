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
          <div className="px-4 py-4">
            <img
              src={props.artpiece.image}
              alt="enlarged image"
              className="w-full rounded-xl"
            />
          </div>
          <div className="px-8 py-2">
          <h3 className="font-black text-gray-800 md:text-3xl text-xl">
            {props.artpiece.title}
          </h3>
          <p className={props.artpiece.forSale ? "text-xl text-gray-800" : "text-xl text-red-500"}>{props.artpiece.forSale ? `$${props.artpiece.price}` : "Sold"}</p>
          </div>
          {/* body */}
          <div className="px-8 mt-2">
          <p className="md:text-lg text-gray-500 text-base">
            {props.artpiece.description}
          </p>
          </div>
          {/* footer  */}
          <div className="items-center gap-2 mt-2 bg-gray-50 py-2 px-4 flex justify-end rounded-md">
            <button
              className="bg-white p-2 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
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
