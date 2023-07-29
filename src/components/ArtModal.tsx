import React, { SetStateAction, useState, Dispatch } from "react";
import { artPiece } from "../interfaces/interfaces";
import ArtPiece from "./ArtPiece";
import categoryIdToName from "../utils/categoryIdToName";

interface props {
  artpiece: {
    id: number;
    title: string;
    description: string;
    height: number;
    width: number;
    thickness: number;
    price: number;
    forSale: boolean;
    image: string;
    notes: string;
    sortPriority: number;
    linkUrl: string;
    linkText: string;
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
        <div className="relative w-full max-w-2xl mx-auto bg-white rounded-md shadow-lg">
          {/* header */}
          <ArtPiece
            id={props.artpiece.id}
            key={props.artpiece.id}
            title={props.artpiece.title}
            description={props.artpiece.description}
            height={props.artpiece.height}
            width={props.artpiece.width}
            thickness={props.artpiece.thickness}
            price={props.artpiece.price}
            forSale={props.artpiece.forSale}
            image={props.artpiece.image}
            sortPriority={props.artpiece.sortPriority}
            linkUrl={props.artpiece.linkUrl}
            linkText={props.artpiece.linkText}
            category={categoryIdToName(props.artpiece.CategoryId)}
            tags={props.artpiece.Tags.map((tagObj: any) => tagObj.name)}
          />
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
