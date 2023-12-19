import React, { useState } from "react";
import { artPieceNode } from "../interfaces/interfaces";
import noImage from '../assets/images/no_image.png'

const WholesalePiece = (props: artPieceNode) => {
  const [image, setImage] = useState(`${process.env.REACT_APP_IMAGE_HOST}${props.image}`)

  const blocks =  props.description.split("\n")

  const handleImageError = () => {
    setImage(noImage)
  }
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col rounded-xl pb-2 mx-auto w-full">
        <div className="w-full grid place-items-center">
          <img
            src={image}
            onError={handleImageError}
            alt={props.title}
            className="rounded-xl w-full"
          />
        </div>
        <div className="w-full flex flex-col px-3 py-1 text-center">
          <h3 className="font-black text-gray-900 md:text-2xl text-xl font-normal tracking-wider">
            {props.title}
          </h3>
          <p className="text-md md:text-lg text-gray-500 text-base tracking-wider">
            {blocks[0]}
          </p>
          {blocks.length > 1
            ? blocks.slice(1).map((block, index) => {
                return block.length > 0 ? (
                  <p
                    className="text-md md:text-lg text-gray-500 text-base tracking-wider text-center"
                    key={index}
                  >
                    {block.trim()}
                  </p>
                ) : (
                  <br key={index} />
                );
              })
            : null}
          {props.link_url ? (
            <a href={props.link_url} target="_blank" rel="noreferrer" className="underline text-md md:text-lg text-blue-500 text-base tracking-wider">
            {props.link_text || props.link_url}
          </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default WholesalePiece;
