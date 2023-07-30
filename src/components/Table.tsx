import React, {useState} from "react";
import { Link } from "react-router-dom";
import { artPiece, table, tableRow } from "../interfaces/interfaces";
import categoryIdToName from "../utils/categoryIdToName";

const Table = (props: table) => {

  return (
    <>
      <table className="max-w-full min-w-full divide-y divide-gray-200 ">
        <colgroup>
          <col span={1} style={{width: "15%"}}/>
          <col span={1} style={{width: "10%"}}/>
          <col span={1} style={{width: "15%"}}/>
          <col span={1} style={{width: "10%"}}/>
          <col span={1} style={{width: "10%"}}/>
          <col span={1} style={{width: "8%"}}/>
          <col span={1} style={{width: "7%"}}/>
          <col span={1} style={{width: "10%"}}/>
          <col span={1} style={{width: "10%"}}/>
          
        </colgroup>
        <thead className="bg-gray-50 ">
          <tr>
            <th
              scope="col"
              className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
            >
              {/* <button className="flex items-center gap-x-3 focus:outline-none">
                <span>Title</span>
              </button> */}
              Title
            </th>

            <th
              scope="col"
              className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
            >
              Category
            </th>

            <th
              scope="col"
              className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
            >
              Description
            </th>

            <th
              scope="col"
              className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
            >
              Notes
            </th>

            <th
              scope="col"
              className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
            >
              Size
            </th>

            <th
              scope="col"
              className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
            >
              For Sale
            </th>
            <th
              scope="col"
              className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
            >
              Price
            </th>
            <th
              scope="col"
              className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 "
            >
              Image
            </th>
            <th
              scope="col"
              className="px-2 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200  ">
          {props.art
            .filter((art: artPiece) => {
              if (props.selectedCategory === "All Categories") {
                return true;
              } else {
                return (
                  categoryIdToName(art.CategoryId) === props.selectedCategory
                );
              }
            })
            .map((art: artPiece) => (
              <TableRow
                id={art.id}
                key={art.id}
                title={art.title}
                description={art.description}
                height={art.height}
                width={art.width}
                thickness={art.thickness}
                price={art.price}
                forSale={art.forSale}
                image={art.image}
                notes={art.notes}
                category={categoryIdToName(art.CategoryId)}
                delete={() => props.deleteArt(art.id, art.title)}
                setModalArt={() => props.setModalArt(art)}                
                setShowModal={() => props.setShowModal(true)}                
              />
            ))}
        </tbody>
      </table>
      
    </>
  );
};

const TableRow = (props: tableRow) => {
  const deleteArt = () => {
    if (props.id) {
      props.delete(props.id, props.title);
    }
  };

  return (
    <tr className="h-20 hover:bg-neutral-100"
    // onClick={() => {
    //   props.setModalArt()
    //   props.setShowModal()
    // }}
    >
      <td className="py-4 text-md font-medium">
          <h2 className="px-4 text-gray-800 font-semibold">
            {props.title}
          </h2>
      </td>
      <td className="py-4 text-sm font-medium whitespace-nowrap">
        <h4 className="inline px-3 text-sm font-normal">
          {props.category}
        </h4>
      </td>
      <td className="px-2 py-4 text-sm whitespace-nowrap">
        <div>
          <h4
            className={
              props.description
                ? "truncate w-40"
                : "text-gray-500 truncate w-24 italic"
            }
          >
            {props.description ? props.description : "N/A"}
          </h4>
        </div>
      </td>
      <td className="px-2 py-4 text-sm whitespace-nowrap">
        <div className="">
          <p
            className={
              props.notes
                ? "truncate w-24"
                : "text-gray-500 truncate w-18 italic"
            }
          >
            {props.notes ? props.notes : "N/A"}
          </p>
        </div>
      </td>
      <td className="px-2 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p className="">
            {props.thickness
              ? `${props.height}" x ${props.width}" x ${props.thickness}"`
              : `${props.height}" x ${props.width}"`}
          </p>
        </div>
      </td>
      <td className="px-2 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p
            className={
              props.forSale
                ? "text-emerald-600 bg-emerald-100/60 rounded p-1"
                : "text-red-600 bg-red-100/60 rounded p-1"
            }
          >
            {props.forSale ? "True" : "False"}
          </p>
        </div>
      </td>
      <td className="px-2 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <p className={props.forSale ? "pl-1" : "pl-1 text-neutral-400"}>
            {props.forSale ? `$${props.price}` : "N/A"}
          </p>
        </div>
      </td>
      <td className="px-2 py-1 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <img
            src={props.image}
            alt={props.title}
            className="h-12 object-contain shadow"
          />
        </div>
      </td>

      <td className="px-2 py-4 text-sm whitespace-nowrap">
        <div className="flex items-center">
          <Link
            to={`/admin/edit/?id=${props.id}`}
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
