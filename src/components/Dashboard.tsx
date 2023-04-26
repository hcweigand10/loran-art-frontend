import React, { useState, ChangeEvent } from "react";
import { useQuery } from "react-query";
import { artPiece } from "../interfaces/interfaces";
import galleryAPI from "../utils/axios";
import Loading from "./Loading";
import TableRow from "./TableRow";
import categoryIdToName from "../utils/categoryIdToName";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [art, setArt] = useState<artPiece[]>([]);
  const [selectedCategroy, setSelectedCategroy] = useState("All Categories");
  const [loading, setLoading] = useState<boolean>(false);

  const { data, refetch } = useQuery({
    queryKey: ["all-art"],
    queryFn: () => galleryAPI.get(`/api/art`),
    onSuccess: (data): void => {
      setArt(data.data);
      setLoading(false);
    },
    staleTime: 10000,
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategroy(category)
  };



  const deleteArt = async (id: number, title: string) => {
    if (
      window.confirm(`Are you sure you want to delete art piece '${title}?'`)
    ) {
      setLoading(true);
      await galleryAPI.delete(`/api/art/${id}`);
      refetch();
    }
  };

  return (
    <section className="mx-auto py-5">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-x-3">
            <h2 className="text-3xl font-light tracking-wider">
              All Art Pieces
            </h2>

            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full  ">
              {art?.length || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 md:flex md:items-end md:justify-between">
        <div className="mb-2">
          <Link to={"/admin/create-new"} className="flex items-center justify-center px-2 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 gap-x-2 hover:bg-blue-600 -500 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>

            <span>Add</span>
          </Link>
        </div>

        <div className="">
          <h5 className="text-sm">Sort by Category</h5>
          <select
            title="sort by"
            className="border-neutral-300 text-gray-600"
            onChange={handleChange}
            value={selectedCategroy}
          >
            <option className="text-neutral-500">All Categories</option>
            <option className="text-neutral-500">Wall Art</option>
            <option className="text-neutral-500">Sculptures</option>
            <option className="text-neutral-500">Toys</option>
            <option className="text-neutral-500">Whistles</option>
            <option className="text-neutral-500">Planes</option>
            <option className="text-neutral-500">Wholesale</option>
            <option className="text-neutral-500">Past Works</option>
          </select>
        </div>
      </div>

      <div className="mt-3">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full pt-2 pb-8 align-middle">
            <div className="overflow-hidden border border-gray-200  rounded-lg drop-shadow-md">
              {loading ? (
                <Loading />
              ) : (
                <>
                  {data ? (
                    <table className="max-w-full min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-gray-50 ">
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 "
                          >
                            <button className="flex items-center gap-x-3 focus:outline-none">
                              <span>Title</span>

                            </button>
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
                        {art.filter((art:artPiece) => {
                          if (selectedCategroy === "All Categories") {
                            return true
                          }
                          else {
                            return categoryIdToName(art.CategoryId) === selectedCategroy
                          }
                        }).map((art: artPiece) => (
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
                            setLoading={setLoading}
                            delete={deleteArt}
                          />
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <h2>Error loading art</h2>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
