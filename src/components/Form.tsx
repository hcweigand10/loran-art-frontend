import React, { ChangeEvent, useState, useEffect, useContext } from "react";
import { useQuery } from "react-query";
import galleryAPI from "../utils/axios";
import { artPiece, formProps } from "../interfaces/interfaces";
import CloudinaryBtn from "./CloudinaryBtn";
import categoryIdToName from "../utils/categoryIdToName";
import Loading from "./Loading";
import categoryNameToId from "../utils/categoryNameToId";
import { useNavigate } from "react-router-dom";
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const Form = (props: formProps) => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [size, setSize] = useState<string>("")
  const [price, setPrice] = useState<number>(0)
  const [forSale, setForSale] = useState<boolean>(true)
  const [image, setImage] = useState<string>("")
  const [categoryId, setCategoryId] = useState<number>(2)
  const [category, setCategory] = useState<string>("Small Walls")
  const [notes, setNotes] = useState<string>("")
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.artId !== 0) {
      refetch();
    }
  }, []);

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: [props.artId.toString()],
    queryFn: () => galleryAPI.get(`/api/art/${props.artId}`),
    onSuccess: (data): void => {
      setTitle(data.data.title)
      setDescription(data.data.description)
      setSize(data.data.size)
      setPrice(data.data.price)
      setForSale(data.data.forSale)
      setImage(data.data.image)
      setNotes(data.data.notes)
      setCategory(categoryIdToName(data.data.categoryId))
      setCategoryId(data.data.CategoryId)
    },
    // staleTime: 10000,
    enabled: false,
  });

  const handleImageUpload = (url: string) => {
    setImage(url)
  };


  const handleCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForSale(!forSale);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
    setCategoryId(categoryNameToId(e.target.value))
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you would like to cancel? Changes will not be saved.")) {
      window.location.assign("/admin")
    }
  }

  const handleSubmit = async () => {
    const body = {
      title,
      description,
      size,
      price,
      forSale,
      image,
      notes,
      CategoryId: categoryId
    }
    console.log(body)
    if (props.artId !== 0) {
      setLoading(true);
      const response = await galleryAPI.put(`/api/art/${props.artId}`, body);
      console.log(response);
      window.location.assign("/admin");
    } else {
      setLoading(true);
      const response = await galleryAPI.post(`/api/art`, body);
      console.log(response);
      setLoading(false);
      window.location.assign("/admin");
    }
  };

  return (
    <div>
      {isLoading || loading ? (
        <Loading />
      ) : (
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Title
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        value={title}
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder=""
                        onChange={(e)=>setTitle(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="description"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Description
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="notes"
                    className="block text-md font-medium leading-6 text-gray-900"
                  >
                    Notes (private)
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                      value={notes}
                      onChange={(e)=>setNotes(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-span-full grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="md:col-span-3">
                    <label
                      htmlFor="size"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Size
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="size"
                        id="size"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        value={size}
                        onChange={(e)=>setSize(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <label
                      htmlFor="image"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Image
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      {image ? (
                        <img
                          src={image}
                          alt={"preview"}
                          className="h-24"
                        />
                      ) : (
                        <p>No image yet</p>
                      )}
                      <CloudinaryBtn
                        image={image ? true : false}
                        handleImageUpload={handleImageUpload}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-full grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div className="relative flex gap-x-3 md:col-span-2">
                      <div className="leading-6">
                        <label
                          htmlFor="forSale"
                          className="font-medium text-md text-gray-900"
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
                          checked={forSale}
                        />
                      </div>
                    </div>
                    <div
                      className={
                        forSale
                          ? "pt-4 md:p-0 md:col-span-3"
                          : "hidden  md:col-span-1"
                      }
                    >
                      <label
                        htmlFor="price"
                        className={
                          forSale
                            ? "block text-md font-medium leading-6 text-gray-900"
                            : "block text-md font-medium leading-6 text-gray-500"
                        }
                      >
                        Price
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md">
                          <span className="flex select-none items-center pl-2 pr-1 text-gray-500 sm:text-sm">
                            $
                          </span>
                          <input
                            disabled={!forSale}
                            type="number"
                            name="price"
                            id="price"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={forSale ? price : ""}
                            onChange={(e)=>setPrice(parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:col-span-3">
                    <label
                      htmlFor="price"
                      className="block text-md font-medium leading-6 text-gray-900"
                    >
                      Category
                    </label>
                    <div className="mt-2">
                      <select
                        title="category"
                        id="category"
                        name="category"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        value={category}
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
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary py-2 px-3 text-sm font-semibold text-white hover:drop-shadow-lg"
              onClick={handleSubmit}
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
