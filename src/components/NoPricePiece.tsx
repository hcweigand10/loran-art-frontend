import React, {useState} from 'react'
import { artPieceNode } from '../interfaces/interfaces';

const NoPricePiece = (props: artPieceNode) => {
  const blocks =  props.description.split("\n")
  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col rounded-xl pb-2 mx-auto w-full">
        <div className="w-full grid place-items-center">
          <img
            src={props.image}
            alt={props.title}
            className="rounded-xl w-full"
          />
        </div>
        <div className="w-full flex flex-col px-3 py-1">
          <h3 className="font-black text-gray-900 md:text-2xl text-xl font-normal tracking-wider text-center">
            {props.title}
          </h3>
          <p className="text-md md:text-lg text-gray-500 text-base tracking-wider">
            {blocks[0]}
          </p>
          {blocks.length > 1 ? (
            blocks.slice(1).map((block, index) => {
              return (
                <div key={index}>
                  <br />
                  <p className="text-md md:text-lg text-gray-500 text-base tracking-wider">{block.trim()}</p>
                </div>
              )
            })
          ) : null}
          <div className="flex justify-between item-center">
            <div className="flex items-center">
              <p className="text-gray-500 text-md md:text-lg tracking-wider">
                {props.thickness
                  ? `${props.height}" x ${props.width}" x ${props.thickness}"`
                  : `${props.height}" x ${props.width}"`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default NoPricePiece