import React from "react";
import { Link } from "react-router-dom";
import { tableRow } from "../interfaces/interfaces";


const TableRow = (props: tableRow) => {

  const deleteArt = () => {
    if (props.id) {
      props.delete(props.id, props.title)
    }
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
      <td className="pr-4 py-4 text-sm font-medium whitespace-nowrap">
        <div className="inline py-1 text-sm font-normal dark:text-white">
          {props.category}
        </div>
      </td>
      <td className="pr-4 py-4 text-sm whitespace-nowrap">
        <div>
          <h4 className={props.description ? "text-gray-700 truncate w-24" : "text-gray-500 truncate w-24 italic"}>
            {props.description ? props.description : "empty"}
          </h4>
        </div>
      </td>
      <td className="pr-4 py-4 text-sm whitespace-nowrap">
        <div className="w-20">
        <h4 className={props.notes ? "text-gray-700 truncate w-24" : "text-gray-500 truncate w-24 italic"}>
            {props.notes ? props.notes : "empty"}
          </h4>
        </div>
      </td>
      <td className="pr-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p className="pl-1">{props.height}</p>
        </div>
      </td>
      <td className="pr-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p className="pl-1">{props.width}</p>
        </div>
      </td>
      <td className="pr-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p className="pl-1">{props.thickness}</p>
        </div>
      </td>
      <td className="pr-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p className={props.forSale ? "text-emerald-600 bg-emerald-100/60 rounded p-1" : "text-red-600 bg-red-100/60 rounded p-1"}>{props.forSale ? "True" : "False"}</p>
        </div>
      </td>
      <td className="pr-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p className={props.forSale ? "pl-1" : "pl-1 text-neutral-400"}>{props.forSale ? `$${props.price}` : "N/A"}</p>
        </div>
      </td>
      <td className="pr-4 py-1 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <img src={props.image} alt={props.title} className="h-12 object-contain shadow" />
        </div>
      </td>

      <td className="pr-4 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <Link to={`/admin/edit/?id=${props.id}`} className="rounded px-3 py-2 bg-neutral-200 mr-2 hover:shadow-lg hover:bg-neutral-300">
            Edit
          </Link>
          <button className="rounded p-2 bg-red-600 ml-2 text-white hover:shadow-lg hover:bg-red-700" onClick={deleteArt}>
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
