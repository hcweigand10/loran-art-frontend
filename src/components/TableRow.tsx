import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tableRow } from "../interfaces/interfaces";
import galleryAPI from "../utils/axios";

const TableRow = (props: tableRow) => {

  const deleteArt = () => {
    props.delete(props.id, props.title)
  }

  return (
    <tr className="h-20">
      <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
        <div>
          <h2 className="text-gray-800 dark:text-white font-semibold">
            {props.title}
          </h2>
        </div>
      </td>
      <td className="pr-6 py-4 text-sm font-medium whitespace-nowrap">
        <div className="inline py-1 text-sm font-normal dark:text-white">
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
        <div className="flex items-center">
          <p className="pl-1">{props.size}</p>
        </div>
      </td>
      <td className="pr-10 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p className={props.forSale ? "text-emerald-600 bg-emerald-100/60 rounded p-1" : "text-red-600 bg-red-100/60 rounded p-1"}>{props.forSale ? "True" : "False"}</p>
        </div>
      </td>
      <td className="pr-6 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p className={props.price ? "pl-1" : "pl-1 text-neutral-400"}>{props.price ? `$${props.price}` : "N/A"}</p>
        </div>
      </td>
      <td className="pr-6 py-2 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <img src={props.image} alt={props.title} className="h-12 pl-1" />
        </div>
      </td>

      <td className="pr-6 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <Link to={`/admin/edit/id?=${props.id}`} className="rounded px-3 py-2 bg-neutral-200 mr-2">
            Edit
          </Link>
          <button className="rounded p-2 bg-red-600 ml-2 text-white" onClick={deleteArt}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
