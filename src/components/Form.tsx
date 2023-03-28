import React, { ChangeEvent, useState, useEffect } from "react";
import { useQuery } from "react-query";
import galleryAPI from "../utils/axios";
import { artPiece, formProps } from "../interfaces/interfaces";
import categoryIdToName from "../utils/categoryIdToName";
import Loading from "./Loading";
import categoryNameToId from "../utils/categoryNameToId";
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const Form = (props: formProps) => {
  const [artInfo, setArtInfo] = useState<artPiece>({
    id: 0,
    title: "",
    description: "",
    size: "",
    price: 0,
    forSale: false,
    image: "",
    CategoryId: 0,
    category: "",
  });
  const [loading, setLoading] = useState(true);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: [props.artId.toString()],
    queryFn: () => galleryAPI.get(`/api/art/${props.artId}`),
    onSuccess: (data): void => {
      console.log(data);
      setArtInfo({
        ...data.data,
        category: categoryIdToName(data.data.CategoryId),
      });
      setLoading(false);
    },
    staleTime: 1000000,
    enabled: props.artId !== 0,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArtInfo({ ...artInfo, [e.target.name]: e.target.value });
  };

  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
    setArtInfo({ ...artInfo, forSale: !artInfo.forSale });
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setArtInfo({ ...artInfo, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setArtInfo({ ...artInfo, [e.target.name]: e.target.value, CategoryId: categoryNameToId(e.target.value) });
  };

  return (
    <div>
      <h1 className="text-2xl">Edit</h1>
      {loading ? (
        <Loading />
      ) : (
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        value={artInfo.title}
                        type="text"
                        name="title"
                        id="title"
                        className="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder=""
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      value={artInfo.description}
                      onChange={handleTextAreaChange}
                    />
                  </div>
                </div>

                <div className="col-span-full grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="md:col-span-3">
                    <label
                      htmlFor="size"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Size
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="size"
                        id="size"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={artInfo.size}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <label
                      htmlFor="image"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Image
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      {artInfo.image ? (
                        <img
                          src={artInfo.image}
                          alt={"preview"}
                          className="h-24"
                        />
                      ) : (
                        <p>No image yet</p>
                      )}
                      <button
                        type="button"
                        className="rounded-md bg-white py-1.5 px-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-span-full grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="md:col-span-3">
                    <div className="relative flex gap-x-3">
                      <div className="text-sm leading-6">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-900"
                        >
                          For Sale
                        </label>
                      </div>
                      <div className="flex h-6 items-center">
                        <input
                          id="forSale"
                          name="forSale"
                          title="forSale"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          onChange={handleCheckBoxChange}
                          checked={artInfo.forSale}
                        />
                      </div>
                    </div>
                    <div className={artInfo.forSale ? "pt-4" : "hidden"}>
                      <label
                        htmlFor="price"
                        className={
                          artInfo.forSale
                            ? "block text-sm font-medium leading-6 text-gray-900"
                            : "block text-sm font-medium leading-6 text-gray-500"
                        }
                      >
                        Price
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                            $
                          </span>
                          <input
                            disabled={!artInfo.forSale}
                            type="number"
                            name="price"
                            id="price"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            value={artInfo.forSale ? artInfo.price : ""}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        title="category"
                        id="category"
                        name="category"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={artInfo.category}
                        onChange={handleSelectChange}
                      >
                        <option>Small Walls</option>
                        <option>Medium Walls</option>
                        <option>Large Walls</option>
                        <option>Sculptures</option>
                        <option>Toys</option>
                        <option>Whistles</option>
                        <option>Planes</option>
                        <option>Wholesale</option>
                        <option>Past Works</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col-span-full"></div>
              </div>
            </div>
          </div>

          <div className="my-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900 bg-neutral-200 py-2 px-3 rounded-md hover:drop-shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary py-2 px-3 text-sm font-semibold text-white hover:drop-shadow-lg"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Form;
