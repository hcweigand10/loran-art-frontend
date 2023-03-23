import React, { useState } from "react";
import { artPieceNode } from "../interfaces/interfaces";
import { Select, Option } from "@material-tailwind/react";

const component = (props: artPieceNode) => {
  return (
    <tr className="h-20">
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="font-medium text-gray-800 dark:text-white ">
            {props.title}
          </h2>
        </div>
      </td>
      <td className="pr-6 py-4 text-sm font-medium whitespace-nowrap">
        <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
          {props.category}
        </div>
      </td>
      <td className="pr-6 py-4 text-sm whitespace-nowrap">
        <div>
          <h4 className="text-gray-700 dark:text-gray-200">
            {props.description}
          </h4>
        </div>
      </td>
      <td className="pr-6 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">{props.size}</div>
      </td>
      <td className="pr-10 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          {props.forSale ? "True" : "False"}
        </div>
      </td>
      <td className="pr-6 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">${props.price}</div>
      </td>
      <td className="pr-6 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <img src={props.image} alt={props.title} width="200px"/>
        </div>
      </td>

      <td className="pr-6 py-4 text-sm whitespace-nowrap">
        <div className="w-48">
          <Select label="Select Version">
            <Option>Material Tailwind HTML</Option>
            <Option>Material Tailwind React</Option>
            <Option>Material Tailwind Vue</Option>
            <Option>Material Tailwind Angular</Option>
            <Option>Material Tailwind Svelte</Option>
          </Select>
        </div>
      </td>
    </tr>
  );
};

export default component;
