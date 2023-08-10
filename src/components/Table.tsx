import React, { useState } from "react";
import { Link } from "react-router-dom";
import { artPiece, table, tableRow } from "../interfaces/interfaces";
import CategoryIdToName from "../utils/categoryIdToName";
import categoryIdToName from "../utils/categoryIdToName";

const Table = (props: table) => {

  return (
    <div className="overflow-x shadow rounded mb-5">
      <table className="text-left w-full">
        <thead className="bg-slate-700 flex text-white w-full rounded-t">
          <tr className="flex w-full mb-4">
            <th className="p-4 w-1/6">Title</th>
            <th className="p-4 w-1/6">Catergory</th>
            <th className="p-4 w-1/6">Tags</th>
            <th className="p-4 w-1/6">Price</th>
            <th className="p-4 w-1/6">Image</th>
            <th className="p-4 w-1/6">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full max-h-80">
          {props.art
            .filter((art: artPiece) => {
              if (props.selectedCategory === "All Categories") {
                return true;
              } else {
                return (
                  CategoryIdToName(art.CategoryId) === props.selectedCategory
                );
              }
            })
            .map((art: artPiece) => (
              <TableRow
                mdk={art.mdk}
                key={art.mdk}
                title={art.title}
                description={art.description}
                height={art.height}
                width={art.width}
                depth={art.depth}
                price={art.price}
                web={art.web}
                image={art.image}
                notes={art.notes}
                sold={art.sold}
                tags={art.Tags}
                category={CategoryIdToName(art.CategoryId)}
                delete={() => props.deleteArt(art.mdk, art.title)}
                setModalArt={() => props.setModalArt(art)}
                setShowModal={() => props.setShowModal(true)}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
};

const TableRow = (props: tableRow) => {
  const deleteArt = () => {
    if (props.mdk) {
      props.delete(props.mdk, props.title);
    }
  };

  const genTags = () => {
    let tagStr = ""
    for (const tag of props.tags) {
      tagStr += (tag.name + ", ")
    }
    tagStr = tagStr.slice(0,tagStr.length-2)
    return tagStr
  }


  return (
    <tr
      className="flex w-full border-b-2 border-black bg-white"

    >
      <td className="p-4 w-1/6 font-bold text-lg">{props.title}</td>
      <td className="p-4 w-1/6">{props.category}</td>

      <td className="p-4 w-1/6">
        {genTags()}
      </td>
      <td className="p-4 w-1/6">{props.price ? `$${props.price}` : "null"}</td>
      <td className="p-4 w-1/6">
        <img
          src={"https://energysims.com/pics/" + props.image}
          alt={props.title}
          className="h-12 object-contain shadow"
        />
      </td>

      <td className="p-4 w-1/6">
        <div className="flex items-center">
          <Link
            to={`/admin/edit/?id=${props.mdk}`}
            className="rounded px-3 py-2 bg-neutral-200 mr-2 hover:shadow-lg hover:bg-neutral-300"
          >
            View/Edit
          </Link>
          <button
            className="rounded p-2 bg-red-600 ml-2 text-white hover:shadow-lg hover:bg-red-700"
            onClick={deleteArt}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Table;
