import React, { useState } from "react";
import { Link } from "react-router-dom";
import { artPiece, table, tableRow } from "../interfaces/interfaces";
import categoryIdToName from "../utils/categoryIdToName";

const Table = (props: table) => {

  return (
    <div className="overflow-x-auto shadow rounded mb-5">
      <table className="text-left w-full">
        <thead className="bg-slate-700 flex text-white w-full rounded-t">
          <tr className="flex w-full mb-4">
            <th className="p-2 w-40">Title</th>
            <th className="p-2 w-40">Catergory</th>
            <th className="p-2 w-40">Location</th>
            <th className="p-2 w-40">Date Created</th>
            <th className="p-2 w-40">Description</th>
            <th className="p-2 w-40">Tags</th>
            <th className="p-2 w-40">Dimensions</th>
            <th className="p-2 w-40">Price</th>
            <th className="p-2 w-40">Old Price</th>
            <th className="p-2 w-40">Sold</th>
            <th className="p-2 w-40">Sold Date</th>
            <th className="p-2 w-40">Sold Location</th>
            <th className="p-2 w-40">History</th>
            <th className="p-2 w-40">Link Text</th>
            <th className="p-2 w-40">Link Url</th>
            <th className="p-2 w-40">Image</th>
            <th className="p-2 w-40">Web Sort</th>
            <th className="p-2 w-40">MDK</th>
            <th className="p-2 w-40">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full max-h-80">
          {props.art
            .filter((art: artPiece) => {
              if (props.selectedCategory === "All Categories") {
                return true;
              } else {
                return (
                  categoryIdToName(art.categoryId) === props.selectedCategory
                );
              }
            })
            .map((art: artPiece) => (
              <TableRow
                mdk={art.mdk}
                key={art.mdk}
                title={art.title}
                location={art.location}
                description={art.description}
                date_created={art.date_created}
                height={art.height}
                width={art.width}
                depth={art.depth}
                hours={art.hours}
                price={art.price}
                old_price={art.old_price}
                web={art.web}
                image={art.image}
                notes={art.notes}
                sold={art.sold}
                sold_date={art.sold_date}
                sold_location={art.sold_location}
                history={art.history}
                link_url={art.link_url}
                link_text={art.link_text}
                web_sort={art.web_sort}
                tags={art.tags}
                category={categoryIdToName(art.categoryId)}
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
      <td className="p-2 w-40 font-bold text-lg">{props.title}</td>
      <td className="p-2 w-40 border-r-2">{props.category}</td>
      <td className="p-2 w-40 border-r-2">{props.location}</td>
      <td className="p-2 w-40 border-r-2">{props.date_created}</td>
      <td className="p-2 w-40 border-r-2">{props.description}</td>

      <td className="p-2 w-40 border-r-2">
        {genTags()}
      </td>
      <td className="p-2 w-40 border-r-2">{props.height} x {props.width} x {props.depth}</td>
      <td className="p-2 w-40 border-r-2">{props.price ? `$${props.price}` : ""}</td>
      <td className="p-2 w-40 border-r-2">{props.old_price ? `$${props.old_price}` : ""}</td>
      <td className={`p-2 w-40 border-r-2 ${props.sold ? "text-red-400" : ""}`}>{props.sold ? "True" : "False"}</td>
      <td className="p-2 w-40 border-r-2">{props.sold_date}</td>
      <td className="p-2 w-40 border-r-2">{props.sold_location}</td>
      <td className="p-2 w-40 border-r-2">{props.history}</td>
      <td className="p-2 w-40 border-r-2">{props.link_url}</td>
      <td className="p-2 w-40 border-r-2">{props.link_text}</td>
      <td className="p-2 w-40 border-r-2">
        <img
          src={"https://energysims.com/pics/" + props.image}
          alt={props.title}
          className="h-12 object-contain shadow"
        />
      </td>
      <td className="p-2 w-40 border-r-2">{props.web_sort}</td>
      <td className="p-2 w-40 border-r-2">{props.mdk}</td>

      <td className="p-2 w-60 border-r-2 flex justify-center">
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
